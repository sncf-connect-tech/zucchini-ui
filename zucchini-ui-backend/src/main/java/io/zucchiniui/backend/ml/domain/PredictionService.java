package io.zucchiniui.backend.ml.domain;

import io.zucchiniui.backend.ml.rabbitmq.NewPredictionParams;
import io.zucchiniui.backend.scenario.domain.Scenario;

import java.util.List;

public interface PredictionService {

    void insertNewPrediction(NewPredictionParams newPredictionParams);

    void makeAPrediction(String scenarioId);

    void makeAPrediction(Scenario scenario);

    PredictionInformation getPrediction(String scenarioId);

    List<PredictionInformation> getPredictionByTestRunId(String testRunId);

    List<PredictionInformation> getPredictionByScenarioKey(String scenarioKey);

}
