import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import DropdownButton from "react-bootstrap/lib/DropdownButton";

import Button from "../../ui/components/Button";
import MenuItem from "react-bootstrap/lib/MenuItem";
import Radio from "react-bootstrap/lib/Radio";
import Alert from "react-bootstrap/lib/Alert";

export default class UpdateScenarioReviewedStateDialog extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    scenarioId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSetReviewedState: PropTypes.func.isRequired,
    status: PropTypes.string,
    config: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = this.createDefaultState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scenarioId !== this.props.scenarioId) {
      this.setState(this.createDefaultState());
    }
  }

  createDefaultState() {
    return {
      comment: "",
      analyseResult: "",
      analyseAction: "",
      isAnalyseResultValid: false,
      isAnalyseActionValid: false,
      showValidation: false
    };
  }

  onCloseClick = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  isFormValid() {
    const { isAnalyseActionValid, isAnalyseResultValid } = this.state;
    if (this.state.status === "PENDING") {
      return isAnalyseResultValid;
    }
    return isAnalyseActionValid && isAnalyseResultValid;
  }

  onSetReviewedState = event => {
    if (event) {
      event.preventDefault();
    }

    const { scenarioId, onClose, onSetReviewedState } = this.props;
    const { comment, analyseResult, analyseAction } = this.state;

    if (!this.isFormValid()) {
      const isAnalyseActionValid = this.props.status === "PENDING";
      this.setState(prevState => {
        return {
          ...prevState,
          showValidation: true,
          isAnalyseActionValid
        };
      });
      return;
    }

    onSetReviewedState({
      scenarioId,
      comment,
      analyseResult,
      analyseAction
    });

    this.setState(this.createDefaultState());

    onClose();
  };

  onTypeSelected = analyseResult => {
    return () => {
      this.setState(prevState => {
        return {
          ...prevState.scenario,
          analyseResult,
          isAnalyseResultValid: true
        };
      });
    };
  };

  onCommentChange = event => {
    const comment = event.target.value;
    this.setState({
      comment
    });
  };

  textCorrespondingToTag(analyseResult) {
    const analyseResultSelected = this.props.config.encounteredProblems.filter(
      tag => tag["shortLabel"] === analyseResult
    );
    return analyseResultSelected[0]["longLabel"];
  }

  isActionSelected = analyse => {
    return this.state.analyseAction === analyse;
  };

  onActionSelected = analyseAction => {
    return () => {
      this.setState(prevState => {
        return {
          ...prevState.scenario,
          analyseAction,
          isAnalyseActionValid: true
        };
      });
    };
  };

  render() {
    const { show, status, config } = this.props;

    const setOfActions = config.correctionActionConfig ? config.correctionActionConfig : [];
    const actionRadios = setOfActions
      .filter(action => action.type === status)
      .map(action => {
        const { actionLabel, actionCode } = action;
        return (
          <Radio
            key={actionCode}
            checked={this.isActionSelected(actionCode)}
            onChange={this.onActionSelected(actionCode)}
          >
            {actionLabel}
          </Radio>
        );
      });

    const t = config.encounteredProblems ? config.encounteredProblems : [];
    const analyseResultSelect = t.map(tag => {
      const type = tag["shortLabel"];
      const text = tag["longLabel"];
      return (
        <MenuItem key={type} eventKey={type} onSelect={this.onTypeSelected(type)}>
          {text}
        </MenuItem>
      );
    });

    return (
      <Modal bsSize="large" show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Marquer le scénario comme analysé&hellip;</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSetReviewedState}>
            <FormGroup>
              {this.props.status !== "PENDING" ? <ControlLabel>Action effectuée</ControlLabel> : null}
              {this.state.showValidation && !this.state.isAnalyseActionValid ? (
                <Alert bsStyle="danger">Requis</Alert>
              ) : null}
              {actionRadios}
            </FormGroup>
            {this.props.config.encounteredProblems ? (
              <FormGroup>
                <ControlLabel>Quel était le problème?</ControlLabel>
                {this.state.showValidation && !this.state.isAnalyseResultValid ? (
                  <Alert bsStyle="danger">Requis</Alert>
                ) : null}
                <div>
                  <DropdownButton
                    title={
                      this.state.analyseResult
                        ? this.textCorrespondingToTag(this.state.analyseResult)
                        : "Sélectionnez un type d'anomalie"
                    }
                    key="dropdownanalyseResultAnalyse"
                    id="dropdownanalyseResultAnalyse"
                  >
                    {analyseResultSelect}
                  </DropdownButton>
                </div>
              </FormGroup>
            ) : null}
            <FormGroup controlId="comment">
              <ControlLabel>Commentaire</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows="3"
                value={this.state.comment}
                onChange={this.onCommentChange}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseClick}>Annuler</Button>
          <Button bsStyle="primary" onClick={this.onSetReviewedState}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
