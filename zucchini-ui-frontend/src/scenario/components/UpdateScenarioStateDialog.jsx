import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Checkbox from "react-bootstrap/lib/Checkbox";
import Radio from "react-bootstrap/lib/Radio";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import DropdownButton from "react-bootstrap/lib/DropdownButton";

import Button from "../../ui/components/Button";
import MenuItem from "react-bootstrap/lib/MenuItem";

const AVAILABLE_STATUS = {
  PASSED: "Succès",
  FAILED: "Échec",
  NOT_RUN: "Non joué",
  PENDING: "En attente"
};

const PASSED = {
  EXACT_REPLAY: "Rejeu à l'identique",
  HAND_REPLAY: "Rejeu manuel",
  DATE_CHANGE: "Changement de date",
  PROFIL_CHANGE: "Changement de profil",
  OD_CHANGE: "Changement d'OD",
  CORRECT_REGRESSION: "Détection d'une régression corrigée directement",
  OTHER: "Autre action (à indiquer en commentaire)"
};

const NOT_RUN = {
  DATASET: "Absence de jeux de données",
  PARTNER_KO: "Partenaire indisponible",
  NOT_APPLICABLE: "Non applicable"
};

const FAILED = {
  FUNCTIONAL_ANOMALY: "Anomalie fonctionnelle"
};

const ACTIONS = {
  PASSED,
  NOT_RUN,
  FAILED
};

export default class UpdateScenarioStateDialog extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    scenario: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdateState: PropTypes.func.isRequired,
    tags: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = this.createDefaultStateFromProps(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scenario !== this.props.scenario) {
      this.setState(this.createDefaultStateFromProps(this.props));
    }
  }

  createDefaultStateFromProps({ scenario }) {
    let status = null;
    let analyseResult;
    let analyseAction;
    if (scenario) {
      status = scenario.status;
      analyseResult = scenario.analyseResult ? scenario.analyseResult : null;
      analyseAction = scenario.analyse ? scenario.analyse : "";
    }
    return {
      scenario: {
        status,
        reviewed: true,
        analyseResult,
        analyseAction
      },
      comment: ""
    };
  }

  onCloseClick = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  onUpdateState = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.onUpdateState({
      scenarioId: this.props.scenario.id,
      newState: this.state.scenario,
      comment: this.state.comment,
      analyseAction: this.state.analyseAction,
      analyseResult: this.state.analyseResult
    });
    this.props.onClose();
  };

  isStatusSelected = status => {
    return this.state.scenario.status === status;
  };

  onStatusSelected = status => {
    return () => {
      this.setState(prevState => {
        return {
          scenario: {
            ...prevState.scenario,
            status,
            analyseAction: ""
          }
        };
      });
    };
  };

  isActionSelected = analyseAction => {
    return this.state.scenario.analyseAction === analyseAction;
  };

  onActionSelected = analyseAction => {
    return () => {
      this.setState(prevState => {
        return {
          scenario: {
            ...prevState.scenario,
            analyseAction
          }
        };
      });
    };
  };

  onTypeSelected = analyseResult => {
    return () => {
      this.setState(prevState => {
        return {
          scenario: {
            ...prevState.scenario,
            analyseResult
          }
        };
      });
    };
  };

  onReviewedChange = () => {
    this.setState(prevState => {
      return {
        scenario: {
          ...prevState.scenario,
          reviewed: !prevState.scenario.reviewed
        }
      };
    });
  };

  onCommentChange = event => {
    const comment = event.target.value;
    this.setState({
      comment
    });
  };

  textCorrespondingToTag(analyseResult) {
    const analyseResultSelected = this.props.tags.filter(tag => tag["shortLabel"] === analyseResult);
    return analyseResultSelected[0]["longLabel"];
  }

  render() {
    const { show, tags } = this.props;
    const statusRadios = Object.keys(AVAILABLE_STATUS).map(status => {
      const label = AVAILABLE_STATUS[status];
      return (
        <Radio key={status} checked={this.isStatusSelected(status)} onChange={this.onStatusSelected(status)}>
          {label}
        </Radio>
      );
    });

    const setOfActions = ACTIONS[this.state.scenario.status] ? ACTIONS[this.state.scenario.status] : [];
    const actionRadios = Object.keys(setOfActions).map(action => {
      const label = setOfActions[action];
      return (
        <Radio key={action} checked={this.isActionSelected(action)} onChange={this.onActionSelected(action)}>
          {label}
        </Radio>
      );
    });

    const t = tags ? tags : [];
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
          <Modal.Title>Modifier le statut du scénario&hellip;</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onUpdateState}>
            <FormGroup>
              <ControlLabel>Nouveau statut</ControlLabel>
              {statusRadios}
            </FormGroup>
            <FormGroup>
              <ControlLabel>Analyse du scénario</ControlLabel>
              <Checkbox checked={this.state.scenario.reviewed} onChange={this.onReviewedChange}>
                Scénario analysé ?
              </Checkbox>
            </FormGroup>
            {this.props.tags ? (
              <FormGroup>
                <ControlLabel>Quel était le problème?</ControlLabel>
                <div>
                  <DropdownButton
                    title={
                      this.state.scenario.analyseResult
                        ? this.textCorrespondingToTag(this.state.scenario.analyseResult)
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
            <FormGroup>
              {this.state.scenario.status !== "PENDING" ? <ControlLabel>Action effectuée</ControlLabel> : null}
              {actionRadios}
            </FormGroup>
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
          <Button bsStyle="primary" onClick={this.onUpdateState}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
