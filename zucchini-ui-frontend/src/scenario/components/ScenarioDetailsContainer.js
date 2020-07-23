import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ScenarioDetails from "./ScenarioDetails";
import { updateStepFilters } from "../../filters/redux";

const selectScenario = createSelector(
  state => state.scenario.scenario,
  scenario => scenario
);

const selectFilters = createSelector(
  state => state.stepFilters,
  filters => filters
);

const selectedPrediction = createSelector(
  state => state.prediction.selectedPrediction,
  prediction => prediction
);

const selectProps = createStructuredSelector({
  scenario: selectScenario,
  filters: selectFilters,
  prediction: selectedPrediction
});

const ScenarioDetailsContainer = connect(selectProps, {
  onFilterChange: updateStepFilters
})(ScenarioDetails);

export default ScenarioDetailsContainer;
