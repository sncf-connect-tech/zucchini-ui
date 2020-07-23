package io.zucchiniui.backend.ml.rabbitmq;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.zucchiniui.backend.ml.domain.Prediction;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NewPredictionParams {

    @JsonProperty("prediction")
    private List<Prediction> prediction;

    @JsonProperty("zucchiniId")
    private String zucchiniId;

    @JsonProperty("scenarioKey")
    private String scenarioKey;

    @JsonProperty("testRunId")
    private String testRunId;

    @JsonProperty("classifierId")
    private String classifierId;

    @JsonProperty("scenarioId")
    private String scenarioId;

    public NewPredictionParams() {
    }

    public NewPredictionParams(
        List<Prediction> prediction,
        String zucchiniId,
        String scenarioKey,
        String testRunId,
        String classifierId
    ) {
        this.prediction = prediction;
        this.zucchiniId = zucchiniId;
        this.scenarioKey = scenarioKey;
        this.testRunId = testRunId;
        this.classifierId = classifierId;
    }

    public List<Prediction> getPrediction() {
        return prediction;
    }

    public void setPrediction(List<Prediction> prediction) {
        this.prediction = prediction;
    }

    public String getZucchiniId() {
        return zucchiniId;
    }

    public void setZucchiniId(String zucchiniId) {
        this.zucchiniId = zucchiniId;
    }

    public String getScenarioKey() {
        return scenarioKey;
    }

    public void setScenarioKey(String scenarioKey) {
        this.scenarioKey = scenarioKey;
    }

    public String getTestRunId() {
        return testRunId;
    }

    public void setTestRunId(String testRunId) {
        this.testRunId = testRunId;
    }

    public String getClassifierId() {
        return classifierId;
    }

    public void setClassifierId(String classifierId) {
        this.classifierId = classifierId;
    }
}
