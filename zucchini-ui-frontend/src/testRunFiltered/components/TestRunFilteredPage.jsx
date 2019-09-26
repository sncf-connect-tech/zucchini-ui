import PropTypes from "prop-types";
import React, { Fragment } from "react";
import toNiceDate from "../../ui/toNiceDate";

import TestRunFilteredTableContainer from "./TestRunFilteredTableContainer";
import StatsProgressBar from "../../stats/components/StatsProgressBar";
import Page from "../../ui/components/Page";
import TestRunFilteredBreadcrumbContainer from "../../reports/components/ReportsBreadcrumbContainer";

export default class TestRunFilteredPage extends React.Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    testRunId: PropTypes.string.isRequired,
    testRun: PropTypes.object,
    stats: PropTypes.object,
    onLoad: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.loadTestRunFailuresIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunFailuresIfPossible(prevProps);
  }

  loadTestRunFailuresIfPossible(prevProps = {}) {
    const { testRunId, filter } = this.props;
    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({ testRunId, filter });
    }
  }

  render() {
    const { testRun, stats, filter } = this.props;
    var status;
    if (filter == "pending") {
      status = "En attente";
    } else if (filter == "unplayed") {
      status = "Non joués";
    }
    return (
      <Page
        title={
          <Fragment>
            {status} <small>{`Tir du ${toNiceDate(testRun.date)}`}</small>
          </Fragment>
        }
        breadcrumb={<TestRunFilteredBreadcrumbContainer />}
      >
        <StatsProgressBar stats={stats} />
        <hr />
        <TestRunFilteredTableContainer />
      </Page>
    );
  }
}
