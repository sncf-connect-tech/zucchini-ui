import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import { featureFilters, statsDashboardFilters, historyFilters, scenarioFilters, stepFilters } from "./filters/redux";
import { testRuns } from "./testRuns/redux";
import { testRun } from "./testRun/redux";
import { testRunDiff } from "./testRunDiff/redux";
import { feature } from "./feature/redux";
import { scenario } from "./scenario/redux";
import { tags } from "./tags/redux";
import { tagDetails } from "./tagDetails/redux";
import { searchResults } from "./search/redux";
import { errors } from "./errors/redux";
import { presence } from "./presence/redux";
import { loadingIndicator } from "./loadingIndicator/redux";
import { failures } from "./failures/redux";
import { testRunFiltered } from "./testRunFiltered/redux";
import { stepDefinitions } from "./stepDefinitions/redux";
import { prediction } from "./prediction/redux";

const reducer = combineReducers({
  form: formReducer,
  featureFilters,
  statsDashboardFilters,
  historyFilters,
  scenarioFilters,
  stepFilters,
  testRuns,
  testRun,
  testRunDiff,
  feature,
  scenario,
  tags,
  tagDetails,
  searchResults,
  errors,
  presence,
  failures,
  testRunFiltered,
  loadingIndicator,
  stepDefinitions,
  prediction,
});

export default reducer;
