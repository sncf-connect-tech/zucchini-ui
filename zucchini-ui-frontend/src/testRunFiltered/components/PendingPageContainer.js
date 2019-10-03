import { connect } from "react-redux";

import { loadPendingTestRunPage } from "../redux";
import { createTestRunFilterPageSelector } from "./common/containerUtils";

import TestRunFilteredPage from "./common/TestRunFilteredPage";

const selectProps = createTestRunFilterPageSelector("En attente");

const PendingPageContainer = connect(
  selectProps,
  {
    onLoad: loadPendingTestRunPage
  }
)(TestRunFilteredPage);

export default PendingPageContainer;
