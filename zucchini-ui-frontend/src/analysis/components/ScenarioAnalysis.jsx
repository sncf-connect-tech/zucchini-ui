import PropTypes from "prop-types";
import React from "react";
import ProgressBar from "react-bootstrap/lib/ProgressBar";

/**
 * Show the percentage of scenarii already analyzed over the ones that require attention (exclude all the passed ones)
 */
export default class ScenarioAnalysis extends React.PureComponent {
  static propTypes = {
    stats: PropTypes.object.isRequired
  };

  render() {
    const { stats } = this.props;
    const isStatsLoaded = stats.all.count > 0;
    const totalNotPassed = stats.all.count - stats.all.passed;
    const totalNotPassedButReviewed = stats.reviewed.count - stats.reviewed.passed;

    let percentageReviewed = 0;
    let description;
    if (isStatsLoaded) {
      if (totalNotPassed === 0) {
        percentageReviewed = 100;
        description = "Pas de scénario à analyser";
      } else {
        percentageReviewed = Math.round((totalNotPassedButReviewed * 100) / totalNotPassed);
        description = totalNotPassedButReviewed + "/" + totalNotPassed;
        description += totalNotPassed > 1 ? " scénarios analysés" : " scénario analysé";
      }
    }

    return (
      <>
        <h4>Progression de l&apos;analyse</h4>
        <ProgressBar
          className="big"
          now={percentageReviewed}
          label={`${percentageReviewed} %`}
          style={{ marginBottom: "5px" }}
          srOnly={percentageReviewed === 0}
        />
        <div style={{ textAlign: "center" }} className="text-primary">
          {description}
        </div>
      </>
    );
  }
}
