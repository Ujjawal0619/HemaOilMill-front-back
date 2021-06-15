import {
  UPDATE,
  LOAD_RECORD,
  CLEAR_RECORDS,
  CLEAR_LOAD_INPUT,
  DELETE_RECORD,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOAD_RECORD:
      return {
        ...state,
        records: action.payload,
      };
    case DELETE_RECORD:
      return {
        ...state,
        records: state.records?.filter(
          (record) => record._id !== action.payload
        ),
        trigger: !state.trigger,
      };
    case CLEAR_RECORDS:
      return {
        ...state,
        records: null,
        trigger: !state.trigger,
      };
    case UPDATE:
      return {
        ...state,
        loadInput: state.records.filter((record) => {
          return record._id == action.payload;
        })[0],
        trigger: !state.trigger,
      };
    case CLEAR_LOAD_INPUT:
      return {
        ...state,
        loadInput: null,
      };
    default:
      return state;
  }
};
