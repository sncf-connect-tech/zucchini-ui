package io.zucchiniui.backend.testrun.rest;


import com.google.common.base.Strings;
import io.dropwizard.jersey.PATCH;
import io.zucchiniui.backend.campaign.domain.CampaignService;
import io.zucchiniui.backend.campaign.views.CampaignTestRun;
import io.zucchiniui.backend.reportconverter.domain.ReportConverterService;
import io.zucchiniui.backend.testrun.domain.Label;
import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
import io.zucchiniui.backend.testrun.domain.TestRunRepository;
import io.zucchiniui.backend.testrun.domain.TestRunService;
import io.zucchiniui.backend.testrun.views.TestRunListItem;
import io.zucchiniui.backend.testrun.views.TestRunScenarioDiff;
import io.zucchiniui.backend.testrun.views.TestRunViewAccess;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.io.InputStream;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import static org.apache.commons.lang3.StringUtils.isNotEmpty;

@Component
@Path("/testRuns")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TestRunResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestRunResource.class);

    private final TestRunRepository testRunRepository;

    private final TestRunService testRunService;

    private final TestRunViewAccess testRunViewAccess;

    private final ReportConverterService reportConverterService;

    private final CampaignService campaignService;

    public TestRunResource(
        final TestRunRepository testRunRepository,
        final TestRunService testRunService,
        final TestRunViewAccess testRunViewAccess,
        final ReportConverterService reportConverterService,
        final CampaignService campaignService) {
        this.testRunRepository = testRunRepository;
        this.testRunService = testRunService;
        this.testRunViewAccess = testRunViewAccess;
        this.reportConverterService = reportConverterService;
        this.campaignService = campaignService;
    }

    @GET
    public List<TestRunListItem> getLatests(
        @QueryParam("type") final String type,
        @QueryParam("withStats") @DefaultValue("false") final boolean withStats,
        @QueryParam("onlyLatest") @DefaultValue("false") final boolean onlyLatest
    ) {
        Consumer<TestRunQuery> queryPreparator = TestRunQuery::orderByLatestFirst;
        if (!Strings.isNullOrEmpty(type)) {
            queryPreparator = queryPreparator.andThen(q -> q.withType(type));
        }

        return testRunViewAccess.getTestRunListItems(queryPreparator, withStats, onlyLatest);
    }

    @POST
    @Path("create")
    public Response create(@Context UriInfo uriInfo, @Valid @NotNull final CreateTestRunRequest request) {
        final TestRun testRun = new TestRun(request.getType(), request.getEnvironment(), request.getName());
        testRun.setLabels(convertRequestLabels(request.getLabels()));

        if (isNotEmpty(request.getCampaign())) {
            testRun.setCampaign(request.getCampaign());
        }

        testRunRepository.save(testRun);

        final URI location = uriInfo.getBaseUriBuilder()
            .path("/test-runs/{testRunId}")
            .build(testRun.getId());

        final CreatedTestRunResponse response = new CreatedTestRunResponse(testRun.getId());
        return Response.created(location).entity(response).build();
    }

    @GET
    @Path("{testRunId}")
    public TestRun get(@PathParam("testRunId") final String testRunId) {
        LOGGER.debug("Get test run {}", testRunId);
        return testRunRepository.getById(testRunId);
    }

    @PATCH
    @Path("{testRunId}")
    public void update(@PathParam("testRunId") final String testRunId, @Valid @NotNull final UpdateTestRunRequest request) {
        final TestRun testRun = testRunRepository.getById(testRunId);

        if (isNotEmpty(request.getType())) {
            testRun.setType(request.getType());
        }
        if (isNotEmpty(request.getEnvironment())) {
            testRun.setEnvironment(request.getEnvironment());
        }
        if (isNotEmpty(request.getName())) {
            testRun.setName(request.getName());
        }
        if (isNotEmpty(request.getCampaign())) {
            testRun.setCampaign(request.getCampaign());
        }
        testRun.setLabels(convertRequestLabels(request.getLabels()));

        testRunRepository.save(testRun);
    }

    @DELETE
    @Path("{testRunId}")
    public void delete(@PathParam("testRunId") final String testRunId) {
        testRunService.deleteById(testRunId);
    }

    @POST
    @Path("{testRunId}/import")
    public void importCucumberReport(
        @PathParam("testRunId") final String testRunId,
        @QueryParam("group") final String groupStr,
        @QueryParam("dryRun") @DefaultValue("false") final boolean dryRun,
        @QueryParam("onlyNewScenarii") @DefaultValue("false") final boolean onlyNewScenarii,
        @QueryParam("mergeOnlyNewPassedScenarii") @DefaultValue("false") final boolean mergeOnlyNewPassedScenarii,
        @NotNull final InputStream inputStream
    ) {
        final TestRun testRun = testRunRepository.getById(testRunId);
        final Optional<String> group = Optional.ofNullable(Strings.emptyToNull(groupStr));
        reportConverterService.convertAndSaveFeatures(testRun.getId(), inputStream, group, dryRun, onlyNewScenarii, mergeOnlyNewPassedScenarii);
    }

    @GET
    @Path("{leftTestRunId}/scenarioDiff/{rightTestRunId}")
    public TestRunScenarioDiff getScenarioDiff(@PathParam("leftTestRunId") final String leftTestRunId, @PathParam("rightTestRunId") final String rightTestRunId) {
        return testRunViewAccess.getScenarioDiff(leftTestRunId, rightTestRunId);
    }

    @GET
    @Path("campaigns/{campaign}")
    public TestRunsCampaignResponse getCampaignStats(@PathParam("campaign") String campaign){

        final List<CampaignTestRun> stats = this.campaignService.computeCampaignTestRunsStats(campaign);

        return new TestRunsCampaignResponse(campaign, stats);
    }

    private static List<Label> convertRequestLabels(final List<RequestLabel> requestLabels) {
        if (requestLabels == null) {
            return Collections.emptyList();
        }

        return requestLabels.stream()
            .map(requestLabel -> new Label(requestLabel.getName(), requestLabel.getValue(), requestLabel.getUrl()))
            .collect(Collectors.toList());
    }

}
