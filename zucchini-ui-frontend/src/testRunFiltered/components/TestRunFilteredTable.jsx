import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/lib/Table";
import Label from "react-bootstrap/lib/Label";
import Status from "../../ui/components/Status";

export default class TestRunFilteredTable extends React.Component {
  static propTypes = {
    testRunFiltered: PropTypes.object
  };

  render() {
    const { testRunFiltered } = this.props;
    const rows = testRunFiltered.testRunFiltered.map((scenario, index) => {
      return <TestRunFilteredTableRow key={index} scenario={scenario} />;
    });

    return (
      <Table bordered striped hover style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th className="col-md-6">Scénario</th>
            <th className="col-md-1">Statut</th>
            <th className="col-md-1">Analysé</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class TestRunFilteredTableRow extends React.Component {
  static propTypes = {
    scenario: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { scenario } = this.props;

    return (
      <tr key={scenario}>
        <td>
          <Link to={`/scenarios/${scenario.id}`}>
            <b>{scenario.info.keyword}</b> {scenario.info.name}
          </Link>
        </td>
        <td>
          <Status status={scenario.status} />
        </td>
        <td>
          <Label bsStyle={scenario.reviewed ? "success" : "default"}>{scenario.reviewed ? "Oui" : "Non"}</Label>
        </td>
      </tr>
    );
  }
}
