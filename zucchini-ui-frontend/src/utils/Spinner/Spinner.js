import React from "react";
// Libraries
import PropTypes from "prop-types";
// Styles
import { ClipLoader } from "react-spinners";
import "./Spinner.css";

const Spinner = props => (
  <div className="spinner-bottom">
    <ClipLoader sizeUnit={"px"} size={50} color={"#5b5b5b"} loading={props.loading} />
  </div>
);

export default Spinner;

Spinner.propTypes = { loading: PropTypes.bool };
