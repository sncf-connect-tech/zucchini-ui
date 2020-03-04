import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import TestRunCampaignFilterPopover from "./TestRunCampaignFilterPopover";
import { selectTestRunCampaigns } from "../selectors";

const selectProps = createStructuredSelector({
  testRunCampaigns: selectTestRunCampaigns
});

export default connect(selectProps)(TestRunCampaignFilterPopover);
