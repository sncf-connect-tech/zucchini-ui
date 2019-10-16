import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ScenarioTable from "../../../ui/components/ScenarioTable";

const selectFiltered = state => state.testRunFiltered.testRunFiltered;

const selectProps = createStructuredSelector({
  scenarios: selectFiltered
});

const TestRunFilteredTableContainer = connect(selectProps)(ScenarioTable);

export default TestRunFilteredTableContainer;
