import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import TestRunsPage from "./TestRunsPage";
import { loadTestRunsPage } from "../redux";
import selectQueryParams from "../../selectQueryParams";

const selectSelectedType = createSelector(
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams.type || null;
  },
  selectedType => selectedType
);

const selectSelectedEnv = createSelector(
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams.env || null;
  },
  selectedType => selectedType
);

const selectSelectedName = createSelector(
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams.name || null;
  },
  selectedType => selectedType
);

const selectView = createSelector(
  (state, ownProps) => ownProps.match.params.viewType,
  viewType => viewType
);

const selectProps = createStructuredSelector({
  selectedType: selectSelectedType,
  selectedEnv: selectSelectedEnv,
  selectedName: selectSelectedName,
  viewType: selectView
});

export default withRouter(
  connect(
    selectProps,
    {
      onLoad: loadTestRunsPage
    }
  )(TestRunsPage)
);
