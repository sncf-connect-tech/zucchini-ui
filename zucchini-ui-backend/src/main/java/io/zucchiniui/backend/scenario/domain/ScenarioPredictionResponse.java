package io.zucchiniui.backend.scenario.domain;

import java.util.List;

public class ScenarioPredictionResponse {

    private List<LabelConfidencePrediction> prediction;

    private String testId;

    private String testRunId;

    public ScenarioPredictionResponse(List<LabelConfidencePrediction> prediction, String testId, String testRunId) {
        this.prediction = prediction;
        this.testId = testId;
        this.testRunId = testRunId;
    }

    public List<LabelConfidencePrediction> getPrediction() {
        return prediction;
    }

    public void setPrediction(List<LabelConfidencePrediction> prediction) {
        this.prediction = prediction;
    }

    public String getTestId() {
        return testId;
    }

    public void setTestId(String testId) {
        this.testId = testId;
    }

    public String getTestRunId() {
        return testRunId;
    }

    public void setTestRunId(String testRunId) {
        this.testRunId = testRunId;
    }
}
