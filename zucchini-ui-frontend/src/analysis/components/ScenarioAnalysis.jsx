import PropTypes from "prop-types";
import React from "react";
import ProgressBar from "react-bootstrap/lib/ProgressBar";

export default class ScenarioAnalysis extends React.PureComponent {
  static propTypes = {
    stats: PropTypes.object.isRequired
  };

  render() {
    const { stats } = this.props;
    const percentageReviewed = (stats.reviewed.count * 100) / stats.all.count;
    const label = stats.all.count > 1 ? " scénarios analysés" : " scénario analysé";

    return (
      <>
        <h4>Progression de l&apos;analyse</h4>
        <ProgressBar
          className="big"
          now={percentageReviewed}
          label={`${Math.round(percentageReviewed)}%`}
          style={{ marginBottom: "5px" }}
          srOnly={percentageReviewed === 0}
        />
        <div style={{ textAlign: "center" }} className="text-primary">
          {stats.reviewed.count}/{stats.all.count} {label}
        </div>
      </>
    );
  }
}
