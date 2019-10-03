import { default as scenariosApi } from "../api/scenarios";

export function getTestRunUnplayed({ testRunId }) {
  return scenariosApi.getUnplayedScenarii({ testRunId });
}

export function getTestRunPending({ testRunId }) {
  return scenariosApi.getPendingScenarii({ testRunId });
}
