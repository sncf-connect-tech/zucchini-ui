import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TestRunFilteredTable from "./TestRunFilteredTable";

const selectFailures = createSelector(
  state => state.testRunFiltered,
  testRunFiltered => testRunFiltered
);

const selectProps = createStructuredSelector({
  testRunFiltered: selectFailures
});

const TestRunFilteredTableContainer = connect(selectProps)(TestRunFilteredTable);

export default TestRunFilteredTableContainer;
