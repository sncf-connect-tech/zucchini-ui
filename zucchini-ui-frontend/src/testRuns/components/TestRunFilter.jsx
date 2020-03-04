import PropTypes from "prop-types";
import React from "react";
import Overlay from "react-bootstrap/lib/Overlay";
import Popover from "react-bootstrap/lib/Popover";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";

import Button from "../../ui/components/Button";
import Caret from "../../ui/components/Caret";

import TestRunTypeFilterPopoverContainer from "./TestRunTypeFilterPopoverContainer";
import TestRunEnvFilterPopoverContainer from "./TestRunEnvFilterPopoverContainer";
import TestRunNameFilterPopoverContainer from "./TestRunNameFilterPopoverContainer";
import TestRunCampaignFilterPopoverContainer from "./TestRunCampaignFilterPopoverContainer";

export default class TestRunFilter extends React.PureComponent {
  static propTypes = {
    testRunTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    testRunEnvs: PropTypes.arrayOf(PropTypes.string).isRequired,
    testRunNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    testRunCampaigns: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedType: PropTypes.string,
    selectedEnv: PropTypes.string,
    selectedName: PropTypes.string,
    selectedCampaign: PropTypes.string,
    latestRun: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      showSelectableTypes: false,
      showSelectableNames: false,
      showSelectableEnvs: false,
      showSelectableCampaigns: false,
      overlayTargetType: null,
      overlayTargetEnv: null,
      overlayTargetName: null,
      overlayTargetCampaign: null
    };
  }

  onShowPopoverTypeClick = event => {
    this.setState({
      showSelectableTypes: true,
      overlayTargetType: event.target
    });
  };

  onShowPopoverEnvClick = event => {
    this.setState({
      showSelectableEnvs: true,
      overlayTargetEnv: event.target
    });
  };

  onShowPopoverNameClick = event => {
    this.setState({
      showSelectableNames: true,
      overlayTargetName: event.target
    });
  };

  onShowPopoverCampaignClick = event => {
    this.setState({
      showSelectableCampaigns: true,
      overlayTargetCampaign: event.target
    });
  };

  onHidePopoverType = () => {
    this.setState({
      showSelectableTypes: false
    });
  };

  onHidePopoverEnv = () => {
    this.setState({
      showSelectableEnvs: false
    });
  };

  onHidePopoverName = () => {
    this.setState({
      showSelectableNames: false
    });
  };

  onHidePopoverCampaign = () => {
    this.setState({
      showSelectableCampaigns: false
    });
  };

  render() {
    const { selectedType, selectedEnv, selectedName, selectedCampaign } = this.props;
    const {
      showSelectableTypes,
      showSelectableEnvs,
      showSelectableNames,
      showSelectableCampaigns,
      overlayTargetType,
      overlayTargetEnv,
      overlayTargetName,
      overlayTargetCampaign
    } = this.state;

    return (
      <div className="btn-toolbar" style={{ position: "relative", marginBottom: "10px" }}>
        <ButtonGroup bsSize="xsmall">
          <Button active={showSelectableTypes} onClick={this.onShowPopoverTypeClick}>
            Type de tir : <b>{selectedType ? selectedType : <i>Tous</i>}</b> <Caret />
          </Button>
        </ButtonGroup>
        <Overlay
          show={showSelectableTypes}
          container={this}
          target={overlayTargetType}
          placement="bottom"
          rootClose
          onHide={this.onHidePopoverType}
        >
          <Popover id="test-run-type-filter-container" title="Filtrer par type de tir" style={{ width: "30rem" }}>
            <TestRunTypeFilterPopoverContainer
              selectedType={selectedType}
              selectedEnv={selectedEnv}
              selectedName={selectedName}
              selectedCampaign={selectedCampaign}
              onTypeSelected={this.onHidePopoverType}
            />
          </Popover>
        </Overlay>

        <ButtonGroup bsSize="xsmall">
          <Button active={showSelectableEnvs} onClick={this.onShowPopoverEnvClick}>
            Environnement du tir : <b>{selectedEnv ? selectedEnv : <i>Tous</i>}</b> <Caret />
          </Button>
        </ButtonGroup>
        <Overlay
          show={showSelectableEnvs}
          container={this}
          target={overlayTargetEnv}
          placement="bottom"
          rootClose
          onHide={this.onHidePopoverEnv}
        >
          <Popover
            id="test-run-env-filter-container"
            title="Filtrer par environnement de tir"
            style={{ width: "30rem" }}
          >
            <TestRunEnvFilterPopoverContainer
              selectedType={selectedType}
              selectedEnv={selectedEnv}
              selectedName={selectedName}
              selectedCampaign={selectedCampaign}
              onEnvSelected={this.onHidePopoverEnv}
            />
          </Popover>
        </Overlay>

        <ButtonGroup bsSize="xsmall">
          <Button active={showSelectableNames} onClick={this.onShowPopoverNameClick}>
            Nom du tir : <b>{selectedName ? selectedName : <i>Tous</i>}</b> <Caret />
          </Button>
        </ButtonGroup>
        <Overlay
          show={showSelectableNames}
          container={this}
          target={overlayTargetName}
          placement="bottom"
          rootClose
          onHide={this.onHidePopoverName}
        >
          <Popover id="test-run-name-filter-container" title="Filtrer par nom de tir" style={{ width: "30rem" }}>
            <TestRunNameFilterPopoverContainer
              selectedType={selectedType}
              selectedEnv={selectedEnv}
              selectedName={selectedName}
              selectedCampaign={selectedCampaign}
              onNameSelected={this.onHidePopoverName}
            />
          </Popover>
        </Overlay>

        <ButtonGroup bsSize="xsmall">
          <Button active={showSelectableCampaigns} onClick={this.onShowPopoverCampaignClick}>
            Campagne : <b>{selectedCampaign ? selectedCampaign : <i>Tous</i>}</b> <Caret />
          </Button>
        </ButtonGroup>
        <Overlay
          show={showSelectableCampaigns}
          container={this}
          target={overlayTargetCampaign}
          placement="bottom"
          rootClose
          onHide={this.onHidePopoverCampaign}
        >
          <Popover id="test-run-name-filter-container" title="Filtrer par campagne" style={{ width: "30rem" }}>
            <TestRunCampaignFilterPopoverContainer
              selectedType={selectedType}
              selectedEnv={selectedEnv}
              selectedName={selectedName}
              selectedCampaign={selectedCampaign}
              onCampaignSelected={this.onHidePopoverCampaign}
            />
          </Popover>
        </Overlay>
      </div>
    );
  }
}
