import { connect } from "react-redux";

import { loadUnplayedTestRunPage } from "../redux";
import { createTestRunFilterPageSelector } from "./common/containerUtils";

import TestRunFilteredPage from "./common/TestRunFilteredPage";

const selectProps = createTestRunFilterPageSelector("Non joués");

const UnplayedPageContainer = connect(
  selectProps,
  {
    onLoad: loadUnplayedTestRunPage
  }
)(TestRunFilteredPage);

export default UnplayedPageContainer;
