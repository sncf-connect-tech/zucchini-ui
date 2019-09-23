import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import TestRunNameFilterPopover from "./TestRunNameFilterPopover";
import { selectTestRunNames } from "../selectors";

const selectProps = createStructuredSelector({
  testRunNames: selectTestRunNames
});

export default connect(selectProps)(TestRunNameFilterPopover);
