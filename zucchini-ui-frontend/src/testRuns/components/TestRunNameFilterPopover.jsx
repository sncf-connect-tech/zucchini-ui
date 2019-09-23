import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryString from "query-string";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";

export default class TestRunNameFilterPopover extends React.PureComponent {
  static propTypes = {
    testRunNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedType: PropTypes.string,
    selectedEnv: PropTypes.string,
    selectedName: PropTypes.string,
    onNameSelected: PropTypes.func.isRequired
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

  onNameSelected = () => {
    this.props.onNameSelected();
  };

  createFilter() {
    const { search } = this.state;

    if (search) {
      const searchLowerCase = search.toLowerCase();
      return name => name.toLowerCase().includes(searchLowerCase);
    }

    return () => true;
  }

  render() {
    const { testRunNames, selectedType, selectedEnv, selectedName } = this.props;

    // Any type link

    let allNamesLink = (
      <Link
        to={{ search: queryString.stringify({ type: selectedType, env: selectedEnv }) }}
        onClick={this.onNameSelected}
      >
        <i>Tous les noms</i>
      </Link>
    );
    if (selectedName === "" || selectedName === null) {
      allNamesLink = <b>{allNamesLink}</b>;
    }

    // Links to test run types

    const testRunNameLinks = testRunNames.filter(this.createFilter()).map(name => {
      return (
        <p key={name}>
          <Link
            to={{ search: queryString.stringify({ type: selectedType, env: selectedEnv, name: name }) }}
            onClick={this.onNameSelected}
          >
            {name === selectedName ? <b>{name}</b> : name}
          </Link>
        </p>
      );
    });

    return (
      <div>
        <FormGroup bsSize="small">
          <FormControl
            type="text"
            placeholder="Rechercher un nom de tir"
            value={this.state.search}
            onChange={this.onSearch}
            autoFocus
          />
        </FormGroup>

        <p>{allNamesLink}</p>
        {testRunNameLinks.length > 0 ? (
          testRunNameLinks
        ) : (
          <p>
            <i>Aucun nom trouvé</i>
          </p>
        )}
      </div>
    );
  }
}
