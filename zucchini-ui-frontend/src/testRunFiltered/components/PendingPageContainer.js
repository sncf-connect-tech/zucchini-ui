import { connect } from "react-redux";

import { loadPendingTestRunPage } from "../redux";
import { createTestRunFilterPageSelector } from "../selectors";

import TestRunFilteredPage from "./internal/TestRunFilteredPage";

const selectProps = createTestRunFilterPageSelector("En attente");

const PendingPageContainer = connect(selectProps, {
  onLoad: loadPendingTestRunPage
})(TestRunFilteredPage);

export default PendingPageContainer;
