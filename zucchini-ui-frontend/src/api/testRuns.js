import Client from "./Client";

class TestRunsApi {
  constructor(baseUri) {
    this.client = new Client(`${baseUri}/api/testRuns`);
  }

  getLatests({ withStats, type }) {
    return this.client.get({
      query: { withStats, type }
    });
  }

  getTestRun({ testRunId }) {
    return this.client.get({ path: testRunId });
  }

  createTestRun({ type, plateforme, nom }) {
    return this.client.post({
      path: "/create",
      body: { type, plateforme, nom }
    });
  }

  deleteTestRun({ testRunId }) {
    return this.client.delete({
      path: testRunId,
      hasOutput: false
    });
  }

  async importCucumberResult({ testRunId, file, ...options }) {
    const url = this.client.createUrl({
      path: `${testRunId}/import`,
      query: options
    });

    const fetchParams = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: file
    };

    const response = await fetch(url, fetchParams);
    this.client.handleError({ url, response });
  }

  editTestRun({ testRunId, type, labels }) {
    return this.client.patch({
      path: testRunId,
      hasOutput: false,
      body: {
        type,
        labels
      }
    });
  }

  getTestRunDiff({ testRunId, otherTestRunId }) {
    return this.client.get({
      path: `${otherTestRunId}/scenarioDiff/${testRunId}`
    });
  }
}

const testRuns = new TestRunsApi(configuration.backendBaseUri);

export default testRuns;
