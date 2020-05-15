package io.zucchiniui.backend.ml.rest;

import io.zucchiniui.backend.ml.domain.PredictionInformation;

public class PredictionResponse {

    private String scenarioId;

    PredictionInformation predictions;

    public PredictionResponse() {
    }

    public PredictionResponse(
        String scenarioId,
        PredictionInformation predictions
    ) {
        this.scenarioId = scenarioId;
        this.predictions = predictions;
    }

    public String getScenarioId() {
        return scenarioId;
    }

    public void setScenarioId(String scenarioId) {
        this.scenarioId = scenarioId;
    }

    public PredictionInformation getPredictions() {
        return predictions;
    }

    public void setPredictions(PredictionInformation predictions) {
        this.predictions = predictions;
    }
}
