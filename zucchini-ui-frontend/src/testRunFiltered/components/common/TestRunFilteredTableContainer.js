import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioTable from "../../../ui/components/ScenarioTable";

const selectFiltered = createSelector(
  state => state.testRunFiltered.testRunFiltered,
  testRunFiltered => testRunFiltered
);

const selectProps = createStructuredSelector({
  scenarios: selectFiltered
});

const TestRunFilteredTableContainer = connect(selectProps)(ScenarioTable);

export default TestRunFilteredTableContainer;
