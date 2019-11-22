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

export default class UpdateScenarioReviewedStateDialog extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    scenarioId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSetReviewedState: PropTypes.func.isRequired,
    status: PropTypes.string,
    tags: PropTypes.array
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
      analyseResult: null,
      analyse: null
    };
  }

  onCloseClick = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  onSetReviewedState = event => {
    if (event) {
      event.preventDefault();
    }

    const { scenarioId, onClose, onSetReviewedState } = this.props;
    const { comment, analyseResult, analyse } = this.state;

    onSetReviewedState({
      scenarioId,
      comment,
      analyseResult,
      analyse
    });

    this.setState(this.createDefaultState());

    onClose();
  };

  onTypeSelected = analyseResult => {
    return () => {
      this.setState(prevState => {
        return {
          ...prevState.scenario,
          analyseResult
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
    const analyseResultSelected = this.props.tags.filter(tag => tag["shortLabel"] === analyseResult);
    return analyseResultSelected[0]["longLabel"];
  }

  isActionSelected = analyse => {
    return this.state.analyse === analyse;
  };

  onActionSelected = analyse => {
    return () => {
      this.setState(prevState => {
        return {
          ...prevState.scenario,
          analyse
        };
      });
    };
  };

  render() {
    const { show, tags, status } = this.props;

    const setOfActions = ACTIONS[status] ? ACTIONS[status] : [];
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
          <Modal.Title>Marquer le scénario comme analysé&hellip;</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSetReviewedState}>
            <FormGroup>
              <ControlLabel>Action effectuée</ControlLabel>
              {actionRadios}
            </FormGroup>
            <FormGroup>
              <ControlLabel>Quel était le problème?</ControlLabel>
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
