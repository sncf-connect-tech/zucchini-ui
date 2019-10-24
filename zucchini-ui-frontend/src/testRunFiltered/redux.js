import * as model from "./model";
import { getTestRun, getTestRunStats } from "../testRun/redux";
import { handleActions } from "redux-actions";

// Actions
const UNPLAYED_PREFIX = "UNPLAYED";
const GET_UNPLAYED = `${UNPLAYED_PREFIX}/GET_UNPLAYED`;
const GET_UNPLAYED_FULFILLED = `${GET_UNPLAYED}_FULFILLED`;
const PENDING_PREFIX = "PENDING";
const GET_PENDING = `${PENDING_PREFIX}/GET_PENDING`;
const GET_PENDING_FULFILLED = `${GET_PENDING}_FULFILLED`;

// Action creators
export function loadPendingTestRunPage({ testRunId }) {
  return loadFilteredTestRunPage(testRunId, getPendingTestRun);
}

export function getPendingTestRun({ testRunId }) {
  return {
    type: GET_PENDING,
    payload: model.getTestRunPending({ testRunId }),
    exportmeta: {
      testRunId
    }
  };
}

export function loadUnplayedTestRunPage({ testRunId }) {
  return loadFilteredTestRunPage(testRunId, getUnplayedTestRun);
}

export function getUnplayedTestRun({ testRunId }) {
  return {
    type: GET_UNPLAYED,
    payload: model.getTestRunUnplayed({ testRunId }),
    exportmeta: {
      testRunId
    }
  };
}

function loadFilteredTestRunPage(testRunId, resultProvider) {
  // eslint-disable-next-line no-console
  return async dispatch => {
    const testRunResult$ = dispatch(getTestRun({ testRunId }));

    const testRunFilteredResult$ = dispatch(resultProvider({ testRunId }));
    const stats$ = dispatch(getTestRunStats({ testRunId }));

    await testRunResult$;
    await testRunFilteredResult$;
    await stats$;
    return null;
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
