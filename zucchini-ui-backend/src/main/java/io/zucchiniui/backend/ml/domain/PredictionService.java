package io.zucchiniui.backend.ml.domain;

import io.zucchiniui.backend.ml.rabbitmq.NewPredictionParams;

import java.util.List;

public interface PredictionService {

    void insertNewPrediction(NewPredictionParams newPredictionParams);

    void makeAPrediction(String scenarioId);

    PredictionInformation getPrediction(String scenarioId);

    List<PredictionInformation> getPredictionByTestRunId(String testRunId);

    List<PredictionInformation> getPredictionByScenarioKey(String scenarioKey);

}
