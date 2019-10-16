import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import queryString from "query-string";

import Breadcrumb from "../../../ui/components/Breadcrumb";
import toNiceDate from "../../../ui/toNiceDate";
import getTypeEnvName from "../../../utils/testRunUtils";

const selectBreadcumbItems = createSelector(
  state => state.testRun.testRun,
  (state, props) => props.title,
  (testRun, title) => {
    return [
      {
        value: getTypeEnvName(testRun),
        link: {
          pathname: "/",
          search: queryString.stringify({ type: testRun.type })
        }
      },
      {
        value: `Tir du ${toNiceDate(testRun.date)}`,
        link: `/test-runs/${testRun.id}`
      },
      {
        value: title
      }
    ];
  }
);

const selectProps = createStructuredSelector({
  items: selectBreadcumbItems
});

export default connect(selectProps)(Breadcrumb);
