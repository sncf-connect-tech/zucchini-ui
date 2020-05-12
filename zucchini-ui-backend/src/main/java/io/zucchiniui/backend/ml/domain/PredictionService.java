package io.zucchiniui.backend.ml.domain;

import java.util.List;

public interface PredictionService {

    void makeAPrediction(String scenarioId);

    PredictionInformation getPrediction(String scenarioId);

    List<PredictionInformation> getPredictionByTestRunId(String testRunId);

    List<PredictionInformation> getPredictionByScenarioKey(String scenarioKey);

}
