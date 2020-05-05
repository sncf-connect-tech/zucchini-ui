import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioAnalysis from "../../analysis/components/ScenarioAnalysis";

const selectStats = createSelector(
  state => state.tagDetails.stats,
  stats => stats
);

const selectProps = createStructuredSelector({
  stats: selectStats
});

export default connect(selectProps)(ScenarioAnalysis);
