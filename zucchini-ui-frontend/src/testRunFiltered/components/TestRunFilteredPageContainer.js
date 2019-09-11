import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import { loadTestRunFilteredPage } from "../redux";

import TestRunFilteredPage from "./TestRunFilteredPage";

const selectFilterStatus = createSelector(
  // Permet de recupèrer le dernier élément de l'url :
  // /test-runs/68d27fd7-e31d-45f0-a860-ceca74b04c89/unplayed
  // ici selectFilterStatus retournera "unplayed"
  (state, ownProps) => ownProps.match.url.split("/")[3],
  testRun => testRun
);

const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.match.params.testRunId,
  testRunId => testRunId
);

const selectTestRun = createSelector(
  state => state.testRun.testRun,
  testRun => testRun
);

const selectFilteredScenarii = createSelector(
  state => state.testRunFiltered,
  testRun => testRun
);

const selectStats = createSelector(
  state => state.testRun.stats,
  testRun => testRun
);

const selectProps = createStructuredSelector({
  filter: selectFilterStatus,
  testRunId: selectTestRunId,
  testRun: selectTestRun,
  filteredScenarii: selectFilteredScenarii,
  stats: selectStats
});

const TestRunFilteredPageContainer = connect(
  selectProps,
  {
    onLoad: loadTestRunFilteredPage
  }
)(TestRunFilteredPage);

export default TestRunFilteredPageContainer;
