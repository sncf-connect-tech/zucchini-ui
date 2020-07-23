import { default as predictionApi } from "../api/Prediction";

export function makeAPrediction({ scenarioId }) {
  return predictionApi.makeAPrediction({ scenarioId });
}

export function getPredictionById({ scenarioId }) {
  return predictionApi.getPredictionById({ scenarioId });
}
