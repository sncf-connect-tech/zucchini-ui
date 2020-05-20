import PropTypes from "prop-types";
import React from "react";

import Step from "./Step";

export default class ActionStep extends React.PureComponent {
  static propTypes = {
    scenarioId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    action: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    filters: PropTypes.object.isRequired,
    prediction: PropTypes.object
  };

  render() {
    const { name, action, index, scenarioId, filters, prediction } = this.props;

    const step = {
      info: {
        keyword: name,
        name: `#${index + 1}`
      },
      status: action.status,
      errorMessage: action.errorMessage,
      output: action.output,
      prediction: prediction
    };

    return <Step step={step} scenarioId={scenarioId} filters={filters} special />;
  }
}
