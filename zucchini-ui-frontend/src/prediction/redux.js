import * as model from "./model";
import { handleActions } from "redux-actions";

const PREFIX = "PREDICTION";

const MAKE_PREDICTION = `${PREFIX}/MAKE_PREDICTION`;
const MAKE_PREDICTION_FULFILLED = `${MAKE_PREDICTION}_FULFILLED`;

const GET_PREDICTION_BY_ID = `${PREFIX}/GET_PREDICTION_BY_ID`;
const GET_PREDICTION_BY_ID_FULFILLED = `${GET_PREDICTION_BY_ID}_FULFILLED`;

const GET_PREDICTION_BY_TEST_RUN_ID = `${PREFIX}/GET_PREDICTION_BY_TEST_RUN_ID`;
const GET_PREDICTION_BY_TEST_RUN_ID_FULFILLED = `${GET_PREDICTION_BY_TEST_RUN_ID}_FULFILLED`;

const GET_PREDICTION_BY_SCENARIO_KEY = `${PREFIX}/GET_PREDICTION_BY_SCENARIO_KEY`;
const GET_PREDICTION_BY_SCENARIO_KEY_FULFILLED = `${GET_PREDICTION_BY_SCENARIO_KEY}_FULFILLED`;


export function makeAPrediction({ scenarioId }) {
  return {
    type: MAKE_PREDICTION,
    payload: model.makeAPrediction({ scenarioId }),
    meta: {
      scenarioId
    }
  }
}

export function getPredictionById({ scenarioId }) {
  return {
   type: GET_PREDICTION_BY_ID,
   payload: model.getPredictionById({ scenarioId }),
   meta: {
     scenarioId
   }
  }
}

export function getPredictionByTestRunId({ testRunId }) {
  return {
    type: GET_PREDICTION_BY_TEST_RUN_ID,
    payload: model.getPredictionByTestRunId({ testRunId }),
    meta: {
      testRunId
    }
  }
}

export function getPredictionByScenarioKey({ scenarioKey }) {
  return {
    type: GET_PREDICTION_BY_SCENARIO_KEY,
    payload: model.getPredictionByScenarioKey({ scenarioKey }),
    meta: {
      scenarioKey
    }
  }
}

const initialState = {
  prediction: {
    predictionMade: false,
    selectedPrediction: {},
    predictions: [],
  }
};

export const prediction = handleActions(
  {
    [MAKE_PREDICTION]: (state, action) => {
      return {
        ...state,
        predictionMade: false
      };
    },

    [MAKE_PREDICTION_FULFILLED]: (state, action) => {
      return {
        ...state,
        predictionMade: true
      };
    },

    [GET_PREDICTION_BY_ID_FULFILLED]: (state, action) => {
      return {
        ...state,
        selectedPrediction: action.payload,
      };
    },

    [GET_PREDICTION_BY_TEST_RUN_ID_FULFILLED]: (state, action) => {
      return {
        ...state,
        predictions: action.payload,
      };
    },

    [GET_PREDICTION_BY_SCENARIO_KEY_FULFILLED]: (state, action) => {
      return {
        ...state,
        predictions: action.payload,
      }
    }

  },
  initialState
);
