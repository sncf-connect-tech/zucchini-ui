package io.zucchiniui.backend.analysisResult.rest;

import io.zucchiniui.backend.config.BackendConfiguration;
import io.zucchiniui.backend.analysisResult.domain.AnalysisResultQuery;
import io.zucchiniui.backend.analysisResult.domain.AnalysisResultRepository;
import io.zucchiniui.backend.analysisResult.views.AnalysisResultViewAccess;
import io.zucchiniui.backend.config.EncounteredProblem;
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

    private final BackendConfiguration configuration;

    public AnalysisResultResource(BackendConfiguration configuration) {
        this.configuration = configuration;
    }

    @GET
    public List<EncounteredProblem> getAnalysisResults(@BeanParam final GetAnalysisResultRequestParams resultRequestParams) {
        return configuration.getEncounteredProblem();
    }
}
