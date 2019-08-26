import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import TestRunFilter from "./TestRunFilter";
import { selectTestRunEnvs, selectTestRunNames, selectTestRunTypes } from "../selectors";

const selectProps = createStructuredSelector({
  testRunTypes: selectTestRunTypes,
  testRunNames: selectTestRunNames,
  testRunEnvs: selectTestRunEnvs
});

const TestRunFilterContainer = connect(selectProps)(TestRunFilter);

export default TestRunFilterContainer;
