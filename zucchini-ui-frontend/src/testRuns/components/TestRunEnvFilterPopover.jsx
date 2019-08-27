import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryString from "query-string";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";

export default class TestRunEnvFilterPopover extends React.PureComponent {
  static propTypes = {
    testRunEnvs: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedEnv: PropTypes.string,
    selectedType: PropTypes.string,
    selectedName: PropTypes.string,
    onEnvSelected: PropTypes.func.isRequired
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

  onEnvSelected = () => {
    this.props.onEnvSelected();
  };

  createFilter() {
    const { search } = this.state;

    if (search) {
      const searchLowerCase = search.toLowerCase();
      return env => env.toLowerCase().includes(searchLowerCase);
    }

    return () => true;
  }

  render() {
    const { testRunEnvs, selectedEnv, selectedType, selectedName } = this.props;

    // Any type link
    let allEnvsLink = (
      <Link
        to={{ search: queryString.stringify({ type: selectedType, name: selectedName }) }}
        onClick={this.onEnvSelected}
      >
        <i>Tous les environnements</i>
      </Link>
    );
    if (selectedEnv === "" || selectedEnv === null) {
      allEnvsLink = <b>{allEnvsLink}</b>;
    }

    // Links to test run envs
    const testRunEnvLinks = testRunEnvs.filter(this.createFilter()).map(env => {
      return (
        <p key={env}>
          <Link
            to={{ search: queryString.stringify({ type: selectedType, name: selectedName, env: env }) }}
            onClick={this.onEnvSelected}
          >
            {env === selectedEnv ? <b>{env}</b> : env}
          </Link>
        </p>
      );
    });

    return (
      <div>
        <FormGroup bsSize="small">
          <FormControl
            type="text"
            placeholder="Rechercher un environnement de tir"
            value={this.state.search}
            onChange={this.onSearch}
            autoFocus
          />
        </FormGroup>

        <p>{allEnvsLink}</p>
        {testRunEnvLinks.length > 0 ? (
          testRunEnvLinks
        ) : (
          <p>
            <i>Aucun environnement trouvé</i>
          </p>
        )}
      </div>
    );
  }
}
