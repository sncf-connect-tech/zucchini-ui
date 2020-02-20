import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import PurgeDialog from "./PurgeDialog";
import { purgeTestRuns } from "../redux";
import { selectTestRunTypes, selectTestRunNames, selectLatestTestRuns } from "../selectors";

const selectProps = createStructuredSelector({
  testRunTypes: selectTestRunTypes,
  testRunNames: selectTestRunNames,
  testRuns: selectLatestTestRuns
});

const PurgeDialogContainer = connect(selectProps, {
  onPurge: purgeTestRuns
})(PurgeDialog);

export default PurgeDialogContainer;
