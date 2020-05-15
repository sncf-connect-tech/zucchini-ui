package io.zucchiniui.backend.ml.domain;

import xyz.morphia.annotations.Entity;
import xyz.morphia.annotations.Id;

import java.util.List;

@Entity("prediction")
public class PredictionInformation {

    @Id
    private String id;

    private List<Prediction> predictions;

    private String classifierId;

    private String scenarioId;

    private String testRunId;

    private String scenarioKey;

    public PredictionInformation(
        List<Prediction> predictions,
        String classifierId,
        String scenarioId,
        String testRunId,
        String scenarioKey
    ) {
        this.predictions = predictions;
        this.classifierId = classifierId;
        this.scenarioId = scenarioId;
        this.testRunId = testRunId;
        this.scenarioKey = scenarioKey;
    }

    public String getId() {
        return id;
    }

    public List<Prediction> getPredictions() {
        return predictions;
    }

    public void setPredictions(List<Prediction> predictions) {
        this.predictions = predictions;
    }

    public String getClassifierId() {
        return classifierId;
    }

    public void setClassifierId(String classifierId) {
        this.classifierId = classifierId;
    }

    public String getScenarioId() {
        return scenarioId;
    }

    public void setScenarioId(String scenarioId) {
        this.scenarioId = scenarioId;
    }

    public String getTestRunId() {
        return testRunId;
    }

    public void setTestRunId(String testRunId) {
        this.testRunId = testRunId;
    }

    public String getScenarioKey() {
        return scenarioKey;
    }

    public void setScenarioKey(String scenarioKey) {
        this.scenarioKey = scenarioKey;
    }

    public String getPrediction() {
        String label = "";
        float accuracy = -1;
        for (Prediction prediction : predictions) {
            if (prediction.getAccuracy() > accuracy) {
                accuracy = prediction.getAccuracy();
                label = prediction.getLabel();
            }
        }
        return label;
    }
}
