package io.zucchiniui.backend.ml.rest;

import io.zucchiniui.backend.ml.domain.PredictionInformation;

import java.util.List;

public class PredictionListResponse {

    List<PredictionInformation> prediction;

    public PredictionListResponse() {
    }

    public PredictionListResponse(List<PredictionInformation> prediction) {
        this.prediction = prediction;
    }

    public List<PredictionInformation> getPrediction() {
        return prediction;
    }

    public void setPrediction(List<PredictionInformation> prediction) {
        this.prediction = prediction;
    }
}
