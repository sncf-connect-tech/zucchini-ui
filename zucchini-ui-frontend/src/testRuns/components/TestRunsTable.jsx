import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/lib/Table";
import Badge from "react-bootstrap/lib/Badge";
import Label from "react-bootstrap/lib/Label";
import { Link } from "react-router-dom";

import toNiceDate from "../../ui/toNiceDate";
import Spinner from "../../utils/Spinner/Spinner";
import useInfiniteScroll from "../../utils/Hooks/useInfiniteScroll";

const TestRunsTable = props => {
  const [showedTestRuns, setShowedTestRuns] = useState([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setShowedTestRuns(props.testRuns.slice(0, 50));
    }
    return () => (isMounted = false);
  }, [props.testRuns]);

  function fetchMoreListItems(isMounted) {
    setTimeout(() => {
      if (isMounted) {
        setShowedTestRuns(prevState => [
          ...prevState,
          ...props.testRuns.slice(prevState.length, prevState.length + 20)
        ]);
        setIsFetching(false);
      }
    }, 500);
  }

  const rows = showedTestRuns.map(testRun => <TestRunTableRow key={testRun.id} testRun={testRun} />);

  return (
    <div>
      <Table bordered striped>
        <thead>
          <tr>
            <th className="col-md-1">Type</th>
            <th className="col-md-1">Environnement</th>
            <th className="col-md-1">Nom</th>
            <th className="col-md-3">Tir de test</th>
            <th className="col-md-1">Total</th>
            <th className="col-md-1">Succès</th>
            <th className="col-md-1">Échecs</th>
            <th className="col-md-1">En attente</th>
            <th className="col-md-1">Non joués</th>
            <th className="col-md-1">Analysés</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Spinner loading={isFetching} />
    </div>
  );
};
export default TestRunsTable;

TestRunsTable.propTypes = {
  testRuns: PropTypes.array.isRequired
};

class TestRunTableRow extends React.PureComponent {
  static propTypes = {
    testRun: PropTypes.object.isRequired
  };

  render() {
    const { testRun } = this.props;

    return (
      <tr>
        <td>
          <Label>{testRun.type}</Label>
        </td>
        <td>
          <Label>{testRun.environment}</Label>
        </td>
        <td>
          <Label>{testRun.name}</Label>
        </td>
        <td>
          <Link to={`/test-runs/${testRun.id}`}>Tir du {toNiceDate(testRun.date)}</Link>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.all.count)}</Badge>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.all.passed)}</Badge>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.all.failed)}</Badge>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.all.pending)}</Badge>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.all.notRun)}</Badge>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.reviewed.count)}</Badge>
        </td>
      </tr>
    );
  }
}

function nullToDash(value) {
  return value === null ? "-" : value;
}
