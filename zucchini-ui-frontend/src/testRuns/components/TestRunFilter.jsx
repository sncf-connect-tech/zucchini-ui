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

export default class TestRunFilter extends React.PureComponent {
  static propTypes = {
    testRunTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    testRunEnvs: PropTypes.arrayOf(PropTypes.string).isRequired,
    testRunNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedType: PropTypes.string,
    selectedEnv: PropTypes.string,
    selectedName: PropTypes.string,
    latestRun: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      showSelectableTypes: false,
      showSelectableNames: false,
      showSelectableEnvs: false,
      overlayTargetType: null,
      overlayTargetEnv: null,
      overlayTargetName: null
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

  render() {
    const { selectedType, selectedEnv, selectedName } = this.props;
    const {
      showSelectableTypes,
      showSelectableEnvs,
      showSelectableNames,
      overlayTargetType,
      overlayTargetEnv,
      overlayTargetName
    } = this.state;

    return (
      <div style={{ position: "relative", marginBottom: "10px" }}>
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
          <Popover id="test-run-type-filter-container" title="Filter par type de tir" style={{ width: "30rem" }}>
            <TestRunTypeFilterPopoverContainer
              selectedType={selectedType}
              selectedEnv={selectedEnv}
              selectedName={selectedName}
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
            title="Filter par environnement de tir"
            style={{ width: "30rem" }}
          >
            <TestRunEnvFilterPopoverContainer
              selectedType={selectedType}
              selectedEnv={selectedEnv}
              selectedName={selectedName}
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
          <Popover id="test-run-name-filter-container" title="Filter par nom de tir" style={{ width: "30rem" }}>
            <TestRunNameFilterPopoverContainer
              selectedType={selectedType}
              selectedEnv={selectedEnv}
              selectedName={selectedName}
              onNameSelected={this.onHidePopoverName}
            />
          </Popover>
        </Overlay>
      </div>
    );
  }
}
