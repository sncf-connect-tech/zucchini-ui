import * as model from "./model";
import { getTestRun, getTestRunStats } from "../testRun/redux";
import { handleActions } from "redux-actions";

// Actions
const UNPLAYED_PREFIX = "UNPLAYED";
const GET_UNPLAYED = `${UNPLAYED_PREFIX}/GET_UNPLAYED`;
// eslint-disable-next-line no-unused-vars
const GET_UNPLAYED_FULFILLED = `${GET_UNPLAYED}_FULFILLED`;
const PENDING_PREFIX = "PENDING";
const GET_PENDING = `${PENDING_PREFIX}/GET_PENDING`;
const GET_PENDING_FULFILLED = `${GET_PENDING}_FULFILLED`;

// Action creators

export function loadTestRunFilteredPage({ testRunId, filter }) {
  // eslint-disable-next-line no-console
  return async dispatch => {
    const testRunResult$ = dispatch(getTestRun({ testRunId }));

    const testRunFilteredResult$ = dispatch(getTestRunFiltered({ testRunId, filter }));
    const stats$ = dispatch(getTestRunStats({ testRunId }));

    await testRunResult$;
    await testRunFilteredResult$;
    await stats$;
    return null;
  };
}

export function getTestRunFiltered({ testRunId, filter }) {
  var type;
  var payload;
  if (filter == "pending") {
    type = GET_PENDING;
    payload = model.getTestRunPending({ testRunId });
  } else if (filter == "unplayed") {
    type = GET_UNPLAYED;
    payload = model.getTestRunUnplayed({ testRunId });
  }
  return {
    type: type,
    payload: payload,
    exportmeta: {
      testRunId
    }
  };
}

// Reducer
const initialState = {
  testRunFiltered: []
};

export const testRunFiltered = handleActions(
  {
    [GET_PENDING_FULFILLED]: (state, action) => ({
      ...state,
      testRunFiltered: action.payload
    }),
    [GET_UNPLAYED_FULFILLED]: (state, action) => ({
      ...state,
      testRunFiltered: action.payload
    })
  },
  initialState
);
