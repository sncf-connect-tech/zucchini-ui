import PropTypes from "prop-types";
import React, { Fragment } from "react";
import toNiceDate from "../../../ui/toNiceDate";

import TestRunFilteredTableContainer from "./TestRunFilteredTableContainer";
import StatsProgressBar from "../../../stats/components/StatsProgressBar";
import Page from "../../../ui/components/Page";
import TestRunFilteredBreadcrumbContainer from "./TestRunFilteredBreadcrumbContainer";

export default class TestRunFilteredPage extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
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
    const { testRunId } = this.props;
    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({ testRunId });
    }
  }

  render() {
    const { testRun, stats, title } = this.props;
    return (
      <Page
        title={
          <Fragment>
            {title} <small>{`Tir du ${toNiceDate(testRun.date)}`}</small>
          </Fragment>
        }
        breadcrumb={<TestRunFilteredBreadcrumbContainer title={title} />}
      >
        <StatsProgressBar stats={stats} />
        <hr />
        <TestRunFilteredTableContainer />
      </Page>
    );
  }
}
