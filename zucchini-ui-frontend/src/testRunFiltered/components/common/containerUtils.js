import { createSelector, createStructuredSelector } from "reselect";
export function identity(value) {
  return value;
}

const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.match.params.testRunId,
  identity
);

const selectTestRun = createSelector(
  state => state.testRun.testRun,
  identity
);

const selectStats = createSelector(
  state => state.testRun.stats,
  identity
);

export function createTestRunFilterPageSelector(selectorTitle) {
  return createStructuredSelector({
    title: createSelector(
      () => selectorTitle,
      identity
    ),
    testRunId: selectTestRunId,
    testRun: selectTestRun,
    stats: selectStats
  });
}
