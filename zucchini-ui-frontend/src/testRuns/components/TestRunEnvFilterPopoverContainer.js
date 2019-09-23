import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import TestRunEnvFilterPopover from "./TestRunEnvFilterPopover";
import { selectTestRunEnvs } from "../selectors";

const selectProps = createStructuredSelector({
  testRunEnvs: selectTestRunEnvs
});

export default connect(selectProps)(TestRunEnvFilterPopover);
