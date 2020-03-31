package io.zucchiniui.backend.campaign.domainimpl;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import io.zucchiniui.backend.campaign.domain.CampaignService;
import io.zucchiniui.backend.campaign.views.Campaign;
import io.zucchiniui.backend.campaign.views.CampaignTestRun;
import io.zucchiniui.backend.campaign.views.CampaignTestRunScenariosStats;
import io.zucchiniui.backend.scenario.dao.ScenarioDAO;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.testrun.dao.TestRunDAO;
import io.zucchiniui.backend.testrun.domain.TestRun;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;

/**
 * Default impl for {@link CampaignService} interface.
 */
@Component
public class CampaignServiceImpl implements CampaignService {

    private final TestRunDAO testRunDAO;
    private final ScenarioDAO scenarioDAO;

    public CampaignServiceImpl(TestRunDAO testRunDAO, ScenarioDAO scenarioDAO) {
        this.testRunDAO = testRunDAO;
        this.scenarioDAO = scenarioDAO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<CampaignTestRun> computeCampaignTestRunsStats(String campaign) {
        final List<TestRun> campaignTestRuns = testRunDAO.findAllByCampaign(campaign);
        return campaignTestRuns.stream()
            .map(testRun -> {
                final CampaignTestRun campaignTestRun = new CampaignTestRun();
                campaignTestRun.setType(testRun.getType());
                campaignTestRun.setScenarios(computeScenariosStats(testRun));
                return campaignTestRun;
            }).collect(toList());
    }

    /**
     * Compute scenarios stats for a given test run.
     *
     * @param testRun the test run
     * @return a {@link CampaignTestRunScenariosStats}
     */
    private CampaignTestRunScenariosStats computeScenariosStats(TestRun testRun) {
        final List<Scenario> scenarios = scenarioDAO.createQuery()
            .field("testRunId").equal(testRun.getId())
            .project("status", true)
            .project("reviewed", true)
            .asList();
        final CampaignTestRunScenariosStats.Builder builder = new CampaignTestRunScenariosStats.Builder()
            .withAll(scenarios.size())
            .withFailed((int) scenarios.stream().filter(Scenario::isFailed).count())
            .withToReview((int) scenarios.stream().filter(Scenario::isNotReviewed).count());
        if (!isNull(testRun.getNumberOfScenariosToReviewAtImport())) {
            builder.withToReviewAtImport(testRun.getNumberOfScenariosToReviewAtImport());
        }
        return builder.build();
    }

    @Override
    public List<Campaign> listCampaigns() {
        return testRunDAO.listCampaigns();
    }
}
