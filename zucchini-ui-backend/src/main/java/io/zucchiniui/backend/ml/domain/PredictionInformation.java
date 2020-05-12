package io.zucchiniui.backend.ml.domain;

import xyz.morphia.annotations.Id;

import java.util.List;

public class PredictionInformation {

    @Id
    private String id;

    private List<Prediction> predictions;

    private String classifierId;

    private String zucchiniId;

    private String scenarioId;

    public PredictionInformation(
        List<Prediction> predictions,
        String classifierId,
        String zucchiniId,
        String scenarioId
    ) {
        this.predictions = predictions;
        this.classifierId = classifierId;
        this.zucchiniId = zucchiniId;
        this.scenarioId = scenarioId;
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

    public String getZucchiniId() {
        return zucchiniId;
    }

    public void setZucchiniId(String zucchiniId) {
        this.zucchiniId = zucchiniId;
    }

    public String getScenarioId() {
        return scenarioId;
    }

    public void setScenarioId(String scenarioId) {
        this.scenarioId = scenarioId;
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
