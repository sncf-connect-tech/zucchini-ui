import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import selectQueryParams from "../../selectQueryParams";

const selectBreadcumbItems = createSelector(
  (state, ownProps) => {
    return ownProps || null;
  },
  props => {
    const selectedFilter = selectQueryParams(props.location);
    const viewType = props.viewType || "latest";
    let items;
    if (viewType === "latest") {
      items = [
        {
          value: "Derniers tirs",
          link: "/"
        }
      ];
    } else {
      items = [
        {
          value: "Tous les tirs",
          link: "/all"
        }
      ];
    }

    if (selectedFilter.type) {
      items.push({
        value: `Type ${selectedFilter.type}`,
        link: {
          search: queryString.stringify({ type: selectedFilter.type })
        }
      });
    }

    if (selectedFilter.env) {
      items.push({
        value: `Environnement ${selectedFilter.env}`,
        link: {
          search: queryString.stringify({ env: selectedFilter.env })
        }
      });
    }

    if (selectedFilter.name) {
      items.push({
        value: `Name ${selectedFilter.name}`,
        link: {
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
