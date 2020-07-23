package io.zucchiniui.backend.ml.rest;

import io.zucchiniui.backend.ml.domain.PredictionInformation;
import io.zucchiniui.backend.ml.domain.PredictionService;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Component
@Path("/prediction")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PredictionResource {

    private PredictionService predictionService;

    public PredictionResource(
        PredictionService predictionService
    ) {
        this.predictionService = predictionService;
    }

    @POST
    @Path("/{scenarioId}")
    public void makeAPrediction(
        @PathParam("scenarioId") final String scenarioId
    ) {
        predictionService.makeAPrediction(scenarioId);
    }

    @GET
    @Path("/{scenarioId}")
    public PredictionInformation getPrediction(
        @PathParam("scenarioId") final String scenarioId
    ) {
        return predictionService.getPrediction(scenarioId);
    }

    @GET
    @Path("/testRun/{testRunId}")
    public PredictionListResponse getPredictionByTestRunId(
        @PathParam("testRunId") final String testRunId
    ) {
        return new PredictionListResponse(
            predictionService.getPredictionByTestRunId(testRunId)
        );
    }

    @GET
    @Path("/scenariokey/{scenarioKey}")
    public PredictionListResponse getPredictionByScenarioKey(
        @PathParam("scenarioKey") final String scenarioKey
    ) {
        return new PredictionListResponse(
            predictionService.getPredictionByScenarioKey(scenarioKey)
        );
    }

}
