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

const TYPE_ERROR = {
  GLUE: "Problème de glue",
  PARTENAIRE_KO: "Partenaire ko",
  NO_SOLUTION: "Pas de solution",
  UNKNOWN: "Error inconnue"
};

export default class UpdateScenarioStateDialog extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    scenario: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdateState: PropTypes.func.isRequired
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
    let type;
    if (scenario) {
      status = scenario.status;
      type = scenario.typeError ? scenario.typeError : null;
    }
    return {
      scenario: {
        status,
        reviewed: true,
        type
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
      comment: this.state.comment
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
            status
          }
        };
      });
    };
  };

  onTypeSelected = type => {
    return () => {
      this.setState(prevState => {
        return {
          scenario: {
            ...prevState.scenario,
            type
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

  render() {
    const { show } = this.props;

    const statusRadios = Object.keys(AVAILABLE_STATUS).map(status => {
      const label = AVAILABLE_STATUS[status];
      return (
        <Radio key={status} checked={this.isStatusSelected(status)} onChange={this.onStatusSelected(status)}>
          {label}
        </Radio>
      );
    });

    const typeErrorSelect = Object.keys(TYPE_ERROR).map(typeError => {
      const type = TYPE_ERROR[typeError];
      return (
        <MenuItem key={typeError} eventKey={typeError} onSelect={this.onTypeSelected(typeError)}>
          {type}
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
            <FormGroup>
              <ControlLabel>Type d{"'"}anomalie</ControlLabel>
              <div>
                <DropdownButton
                  title={
                    TYPE_ERROR[this.state.scenario.type]
                      ? TYPE_ERROR[this.state.scenario.type]
                      : "Sélectionnez un type d'erreur"
                  }
                  key="dropdownTypeError"
                  id="dropdownTypeError"
                >
                  {typeErrorSelect}
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
          <Button bsStyle="primary" onClick={this.onUpdateState}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
