import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TestRunsTable from "./TestRunsTable";

import { selectLatestTestRuns } from "../selectors";

const selectTestRuns = createSelector(
  state => selectLatestTestRuns(state),
  (state, ownProps) => ownProps,
  (testRuns, selected) => {
    let selectedTestRuns = testRuns;
    if (selected.selectedType) {
      selectedTestRuns = selectedTestRuns.filter(testRun => testRun.type === selected.selectedType);
    }
    if (selected.selectedEnv) {
      selectedTestRuns = selectedTestRuns.filter(testRun => testRun.environment === selected.selectedEnv);
    }
    if (selected.selectedName) {
      selectedTestRuns = selectedTestRuns.filter(testRun => testRun.name === selected.selectedName);
    }
    if (selected.selectedCampaign) {
      selectedTestRuns = selectedTestRuns.filter(testRun => testRun.campaign === selected.selectedCampaign);
    }
    return selectedTestRuns;
  }
);

const selectProps = createStructuredSelector({
  testRuns: selectTestRuns
});

const TestRunsTableContainer = connect(selectProps)(TestRunsTable);

export default TestRunsTableContainer;
