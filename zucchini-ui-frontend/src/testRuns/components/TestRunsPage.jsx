import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";

import Button from "../../ui/components/Button";
import TestRunsTableContainer from "./TestRunsTableContainer";
import TestRunFilterContainer from "./TestRunFilterContainer";
import CreateTestRunDialogContainer from "./CreateTestRunDialogContainer";
import PurgeDialogContainer from "./PurgeDialogContainer";
import Page from "../../ui/components/Page";
import TestRunsBreadcrumbContainer from "./TestRunsBreadcrumbContainer";

export default class TestRunsPage extends React.Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
    viewType: PropTypes.string.isRequired,
    selectedType: PropTypes.string,
    selectedEnv: PropTypes.string,
    selectedName: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      showCreateTestRunDialog: false,
      showPurgeDialog: false
    };
  }

  componentDidMount() {
    this.loadTestRunsIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunsIfPossible(prevProps);
  }

  loadTestRunsIfPossible(prevProps = {}) {
    const { viewType } = this.props;

    if (viewType !== prevProps.viewType) {
      this.props.onLoad({ viewType });
    }
  }

  onCreateTestRunButtonClick = event => {
    event.preventDefault();

    this.setState({
      showCreateTestRunDialog: true
    });
  };

  onPurgeButtonClick = () => {
    this.setState({
      showPurgeDialog: true
    });
  };

  hideCreateTestRunDialog = () => {
    this.setState({
      showCreateTestRunDialog: false
    });
  };

  hidePurgeDialog = () => {
    this.setState({
      showPurgeDialog: false
    });
  };

  render() {
    const { selectedType, selectedEnv, selectedName, viewType } = this.props;
    const { showCreateTestRunDialog, showPurgeDialog } = this.state;

    return (
      <Page
        title={
          <Fragment>
            {viewType === "latest" ? "Derniers tirs " : "Tous les tirs "}
            {selectedType && <small>Type {selectedType} </small>}
            {selectedEnv && <small>Environnement {selectedEnv} </small>}
            {selectedName && <small>Nom {selectedName}</small>}
          </Fragment>
        }
        breadcrumb={<TestRunsBreadcrumbContainer viewType={viewType} />}
      >
        <ButtonToolbar>
          <ButtonGroup>
            <Button glyph="plus-sign" onClick={this.onCreateTestRunButtonClick}>
              Créer un tir
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button glyph="tree-deciduous" onClick={this.onPurgeButtonClick}>
              Purger les anciens tirs
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <hr />
        <TestRunFilterContainer selectedType={selectedType} selectedEnv={selectedEnv} selectedName={selectedName} />
        <TestRunsTableContainer selectedType={selectedType} selectedEnv={selectedEnv} selectedName={selectedName} />
        <CreateTestRunDialogContainer show={showCreateTestRunDialog} onClose={this.hideCreateTestRunDialog} />
        {showPurgeDialog && (
          <PurgeDialogContainer
            currentSelectedType={selectedType}
            show={showPurgeDialog}
            onClose={this.hidePurgeDialog}
          />
        )}
      </Page>
    );
  }
}
