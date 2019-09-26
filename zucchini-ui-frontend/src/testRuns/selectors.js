import { createSelector } from "reselect";

import { createStats, UNDEFINED_STATS_NUMBERS } from "./model";

export const selectTestRunTypes = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    const typeSet = new Set(testRuns.map(testRun => testRun.type));
    const types = Array.from(typeSet);
    types.sort();
    return types;
  }
);

export const selectTestRunEnvs = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    const envSet = new Set(testRuns.map(testRun => testRun.environment));
    const envs = Array.from(envSet);
    envs.sort();
    return envs;
  }
);

export const selectTestRunNames = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    const nameSet = new Set(testRuns.map(testRun => testRun.name));
    const names = Array.from(nameSet);
    names.sort();
    return names;
  }
);

export const selectLatestTestRuns = createSelector(
  state => state.testRuns.testRuns,
  testRuns => {
    return testRuns.map(testRun => {
      if (testRun.stats) {
        return testRun;
      }

      return {
        ...testRun,
        stats: createStats(UNDEFINED_STATS_NUMBERS)
      };
    });
  }
);
