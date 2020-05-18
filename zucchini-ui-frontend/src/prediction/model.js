import { default as predictionApi } from "../api/Prediction";

export function makeAPrediction({ scenarioId }) {
  return predictionApi.makeAPrediction({ scenarioId });
}

export function getPredictionById({ scenarioId }) {
  return predictionApi.getPredictionById({ scenarioId });
}

/*
export function getPredictionByTestRunId({ testRunId }) {
  return predictionApi.getPredictionByTestRunId({ testRunId });
}

export function getPredictionByScenarioKey({ scenarioKey }) {
  return predictionApi.getPredictionByScenarioKey({ scenarioKey });
}
 */
