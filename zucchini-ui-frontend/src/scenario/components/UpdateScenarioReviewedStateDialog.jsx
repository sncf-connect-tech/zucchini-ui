import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import DropdownButton from "react-bootstrap/lib/DropdownButton";

import Button from "../../ui/components/Button";
import MenuItem from "react-bootstrap/lib/MenuItem";

const TYPE_ERROR = {
  GLUE: "Problème de glue",
  PARTENAIRE_KO: "Partenaire ko",
  NO_SOLUTION: "Pas de solution",
  UNKNOWN: "Error inconnue"
};

export default class UpdateScenarioReviewedStateDialog extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    scenarioId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSetReviewedState: PropTypes.func.isRequired
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
      analyseResult: null
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
    const { comment, analyseResult } = this.state;

    onSetReviewedState({
      scenarioId,
      comment,
      analyseResult
    });

    this.setState(this.createDefaultState());

    onClose();
  };

  isStatusSelected(status) {
    return this.state.scenario.status === status;
  }

  onStatusSelected(status) {
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
  }

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

  render() {
    const { show } = this.props;

    const analyseResultSelect = Object.keys(TYPE_ERROR).map(analyseResult => {
      const type = TYPE_ERROR[analyseResult];
      return (
        <MenuItem key={analyseResult} eventKey={analyseResult} onSelect={this.onTypeSelected(analyseResult)}>
          {type}
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
              <ControlLabel>Type d{"'"}anomalie</ControlLabel>
              <div>
                <DropdownButton
                  title={
                    TYPE_ERROR[this.state.analyseResult]
                      ? TYPE_ERROR[this.state.analyseResult]
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
