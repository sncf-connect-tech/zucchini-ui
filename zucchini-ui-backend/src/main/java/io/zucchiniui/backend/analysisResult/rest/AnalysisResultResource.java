package io.zucchiniui.backend.analysisResult.rest;

import io.zucchiniui.backend.analysisResult.domain.AnalysisResultQuery;
import io.zucchiniui.backend.analysisResult.domain.AnalysisResultRepository;
import io.zucchiniui.backend.analysisResult.views.AnalysisResultViewAccess;
import io.zucchiniui.backend.analysisResult.views.AnalysisResultListItemView;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;
import java.util.List;
import java.util.function.Consumer;

@Component
@Path("/analysis")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AnalysisResultResource {

    private final AnalysisResultRepository analysisResultRepository;

    private final AnalysisResultViewAccess analysisResultViewAccess;

    private UriInfo uriInfo;

    public AnalysisResultResource(
        AnalysisResultRepository analysisResultRepository,
        AnalysisResultViewAccess analysisResultViewAccess
        ) {
        this.analysisResultRepository = analysisResultRepository;
        this.analysisResultViewAccess = analysisResultViewAccess;
    }

    @Context
    public void setUriInfo(final UriInfo uriInfo) {
        this.uriInfo = uriInfo;
    }

    @GET
    public List<AnalysisResultListItemView> getAnalysisResults(@BeanParam final GetAnalysisResultRequestParams resultRequestParams) {
        final Consumer<AnalysisResultQuery> query = prepareQueryFromRequestParams(resultRequestParams);
        return analysisResultViewAccess.getAnalysisResultListItems(query);
    }

    private static Consumer<AnalysisResultQuery> prepareQueryFromRequestParams(final GetAnalysisResultRequestParams requestParams) {
        return AnalysisResultQuery::orderByShortLabel;
    }
}
