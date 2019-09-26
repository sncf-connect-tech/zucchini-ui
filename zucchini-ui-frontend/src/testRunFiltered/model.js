import { default as scenariosApi } from "../api/scenarios";

export function getTestRunUnplayed({ testRunId }) {
  return scenariosApi.getUnplayed({ testRunId });
}

export function getTestRunPending({ testRunId }) {
  return scenariosApi.getPending({ testRunId });
}
