import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Alert from "react-bootstrap/lib/Alert";
import { Typeahead } from "react-bootstrap-typeahead";
import format from "date-fns/format";
import isBefore from "date-fns/isBefore";
import subDays from "date-fns/subDays";
import parseISO from "date-fns/parseISO";

import Button from "../../ui/components/Button";

const LOCAL_DATE_FORMAT = "yyyy-MM-dd";

export default class PurgeDialog extends React.PureComponent {
  static propTypes = {
    selectedType: PropTypes.string,
    selectedName: PropTypes.string,
    show: PropTypes.bool.isRequired,
    testRunTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    testRunNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    testRuns: PropTypes.array.isRequired,
    purgeDelayInDays: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    onPurge: PropTypes.func.isRequired
  };

  static defaultProps = {
    purgeDelayInDays: 90
  };

  constructor(props) {
    super(props);
    const type = props.selectedType || "";
    const name = props.selectedName || "";
    const maxDate = subDays(new Date(), props.purgeDelayInDays);
    this.state = {
      type,
      name,
      maxDate: format(maxDate, LOCAL_DATE_FORMAT),
      selectedTestRunIds: this.filterTestRunIdsToPurge(this.props.testRuns, { type, name, maxDate })
    };
  }

  handleTypeChange = event => {
    event.preventDefault();
    const type = event.target.value;
    this.updateState({
      type
    });
  };

  handleNameChange = changedNameItem => {
    this.updateState({
      name: changedNameItem[0] !== undefined ? changedNameItem[0].name : ""
    });
  };

  handleMaxDateChange = event => {
    event.preventDefault();
    const maxDate = event.target.value;
    this.updateState({
      maxDate
    });
  };

  handleCloseClick = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  handlePurgeSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.onPurge({ selectedTestRunIds: this.state.selectedTestRunIds });
    this.props.onClose();
  };

  // TODO Code refactor using action. It's strictly forbidden to act on state without using actions !!!
  updateState(newState) {
    this.setState((prevState, props) => {
      return {
        ...newState,
        selectedTestRunIds: this.filterTestRunIdsToPurge(props.testRuns, { ...prevState, ...newState })
      };
    });
  }

  filterTestRunIdsToPurge(testRuns, { type, name, maxDate }) {
    return testRuns
      .filter(testRun => (type !== "" ? testRun.type === type : true))
      .filter(testRun => (name !== "" ? testRun.name === name : true))
      .filter(testRun => (maxDate !== "" ? isBefore(parseISO(testRun.date), parseISO(maxDate)) : true))
      .map(testRun => testRun.id);
  }

  render() {
    const { show, testRunTypes, testRunNames } = this.props;
    const { type, maxDate, selectedTestRunIds } = this.state;

    console.log("render");
    const testRunTypeOptions = testRunTypes.map(testRunType => {
      return (
        <option key={testRunType} value={testRunType}>
          {testRunType}
        </option>
      );
    });

    const testRunNameOpts = testRunNames.map(testRunName => {
      return { name: testRunName };
    });

    let selectionAlert = null;

    let aboutChange = "";
    const selectedTestRunCount = selectedTestRunIds.length;
    if (selectedTestRunCount > 0) {
      aboutChange = `${selectedTestRunCount} tir(s) à purger`;
    } else {
      aboutChange = "Aucun tir à purger";
    }

    selectionAlert = <Alert bsStyle="warning">{aboutChange}</Alert>;
    return (
      <Modal show={show} onHide={this.handleCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Purger les anciens tirs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handlePurgeSubmit}>
            <FormGroup controlId="type">
              <ControlLabel>Type</ControlLabel>
              <FormControl componentClass="select" autoFocus value={type} onChange={this.handleTypeChange}>
                <option />
                {testRunTypeOptions}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="name">
              <ControlLabel>Nom</ControlLabel>
              <Typeahead
                id="test-run-name-selection"
                labelKey="name"
                placeholder="Entrer le nom d'un tir..."
                options={testRunNameOpts}
                onChange={this.handleNameChange}
              />
            </FormGroup>
            <FormGroup controlId="maxDate">
              <ControlLabel>Date maximum des tirs à purger</ControlLabel>
              <FormControl type="date" value={maxDate} onChange={this.handleMaxDateChange} />
            </FormGroup>
            {selectionAlert}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCloseClick}>Annuler</Button>
          <Button bsStyle="primary" onClick={this.handlePurgeSubmit}>
            Purger
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
