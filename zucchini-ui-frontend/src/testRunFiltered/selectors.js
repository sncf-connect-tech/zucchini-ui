import { createStructuredSelector } from "reselect";

const selectTestRunId = (state, ownProps) => ownProps.match.params.testRunId;

const selectTestRun = state => state.testRun.testRun;

const selectStats = state => state.testRun.stats;

export function createTestRunFilterPageSelector(title) {
  return createStructuredSelector({
    title: () => title,
    testRunId: selectTestRunId,
    testRun: selectTestRun,
    stats: selectStats
  });
}
