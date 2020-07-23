import * as model from "./model";
import { handleActions } from "redux-actions";

const PREFIX = "PREDICTION";
const GET_PREDICTION_BY_ID = `${PREFIX}/GET_PREDICTION_BY_ID`;
const GET_PREDICTION_BY_ID_FULFILLED = `${GET_PREDICTION_BY_ID}_FULFILLED`;

export function getPredictionById({ scenarioId }) {
  return {
    type: GET_PREDICTION_BY_ID,
    payload: model.getPredictionById({ scenarioId }),
    meta: {
      scenarioId
    }
  };
}

const initialState = {
  prediction: {
    predictionMade: false,
    selectedPrediction: {},
    predictions: []
  }
};

export const prediction = handleActions(
  {
    [GET_PREDICTION_BY_ID_FULFILLED]: (state, action) => {
      return {
        ...state,
        selectedPrediction: action.payload
      };
    }
  },
  initialState
);
