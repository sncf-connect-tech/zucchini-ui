import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryString from "query-string";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";

export default class TestRunCampaignFilterPopover extends React.PureComponent {
  static propTypes = {
    testRunCampaigns: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedType: PropTypes.string,
    selectedEnv: PropTypes.string,
    selectedName: PropTypes.string,
    selectedCampaign: PropTypes.string,
    onCampaignSelected: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  onSearch = event => {
    this.setState({
      search: event.target.value
    });
  };

  onCampaignSelected = () => {
    this.props.onCampaignSelected();
  };

  createFilter() {
    const { search } = this.state;

    if (search) {
      const searchLowerCase = search.toLowerCase();
      return type => type.toLowerCase().includes(searchLowerCase);
    }

    return () => true;
  }

  render() {
    const { testRunCampaigns, selectedType, selectedEnv, selectedName, selectedCampaign } = this.props;

    // Any type link

    let allCampaignsLink = (
      <Link
        to={{
          search: queryString.stringify({
            type: selectedType,
            name: selectedName,
            env: selectedEnv
          })
        }}
        onClick={this.onCampaignSelected}
      >
        <i>Tous les types</i>
      </Link>
    );
    if (!selectedType) {
      allCampaignsLink = <b>{allCampaignsLink}</b>;
    }

    // Links to test run types

    const testRunCampaignLinks = testRunCampaigns.filter(this.createFilter()).map(campaign => {
      return (
        <p key={campaign}>
          <Link
            to={{
              search: queryString.stringify({
                type: selectedType,
                name: selectedName,
                env: selectedEnv,
                campaign: campaign
              })
            }}
            onClick={this.onCampaignSelected}
          >
            {campaign === selectedCampaign ? <b>{campaign}</b> : campaign}
          </Link>
        </p>
      );
    });

    return (
      <div>
        <FormGroup bsSize="small">
          <FormControl
            type="text"
            placeholder="Rechercher une campagne"
            value={this.state.search}
            onChange={this.onSearch}
            autoFocus
          />
        </FormGroup>

        <p>{allCampaignsLink}</p>
        {testRunCampaignLinks.length > 0 ? (
          testRunCampaignLinks
        ) : (
          <p>
            <i>Aucune campagne trouvé</i>
          </p>
        )}
      </div>
    );
  }
}
