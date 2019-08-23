import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import selectQueryParams from "../../selectQueryParams";

const selectBreadcumbItems = createSelector(
  (state, ownProps) => {
    const queryParams = selectQueryParams(ownProps.location);
    return queryParams || null;
  },
  selectedFilter => {
    const items = [
      {
        value: "Derniers tirs",
        link: "/"
      }
    ];

    if (selectedFilter.type) {
      items.push({
        value: `Type ${selectedFilter.type}`,
        link: {
          pathname: "/",
          search: queryString.stringify({ type: selectedFilter.type })
        }
      });
    }

    if (selectedFilter.env) {
      items.push({
        value: `Environnement ${selectedFilter.env}`,
        link: {
          pathname: "/",
          search: queryString.stringify({ env: selectedFilter.env })
        }
      });
    }

    if (selectedFilter.name) {
      items.push({
        value: `Name ${selectedFilter.env}`,
        link: {
          pathname: "/",
          search: queryString.stringify({ name: selectedFilter.name })
        }
      });
    }

    return items;
  }
);

const selectProps = createStructuredSelector({
  items: selectBreadcumbItems
});

export default withRouter(connect(selectProps)(Breadcrumb));
