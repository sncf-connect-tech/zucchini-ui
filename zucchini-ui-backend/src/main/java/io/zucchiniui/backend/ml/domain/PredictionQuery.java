package io.zucchiniui.backend.ml.domain;

public interface PredictionQuery {

    PredictionQuery withScenarioId(String scenarioId);

    PredictionQuery withTestRunId(String testRunId);

    PredictionQuery withScenarioKey(String scenarioKey);

}
