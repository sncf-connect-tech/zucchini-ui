import { connect } from "react-redux";

import { loadUnplayedTestRunPage } from "../redux";
import { createTestRunFilterPageSelector } from "../selectors";

import TestRunFilteredPage from "./internal/TestRunFilteredPage";

const selectProps = createTestRunFilterPageSelector("Non joués");

const UnplayedPageContainer = connect(selectProps, {
  onLoad: loadUnplayedTestRunPage
})(TestRunFilteredPage);

export default UnplayedPageContainer;
