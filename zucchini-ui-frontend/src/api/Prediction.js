import Client from "./Client";

class PredictionApi {
  constructor() {
    this.client = new Client("/api/prediction");
  }

  makeAPrediction({ scenarioId }) {
    return this.client.post({
      path: `/${id}`
    });
  }

  getPredictionById({ id }) {
    return this.client.get({
      path: `/${id}`
    });
  }

  getPredictionByTestRunId({ testRunId }) {
    return this.client.get({
      path: `/testRun/${testRunId}`
    });
  }

  getPredictionByScenarioKey({ scenarioKey }) {
    return this.client.get({
      path: `/scenariokey/${scenarioKey}`
    });
  }
}

const prediction = new PredictionApi();

export default prediction;
