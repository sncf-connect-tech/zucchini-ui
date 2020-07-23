import Client from "./Client";

class PredictionApi {
  constructor() {
    this.client = new Client("/api/prediction");
  }

  makeAPrediction({ scenarioId }) {
    return this.client.post({
      path: `/${scenarioId}`
    });
  }

  getPredictionById({ scenarioId }) {
    return this.client.get({
      path: `/${scenarioId}`
    });
  }
}

const prediction = new PredictionApi();

export default prediction;
