import { DELETE_RECORD, LOAD_PAYMENTS, CLEAR_CALENDER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOAD_PAYMENTS:
      return {
        ...state,
        payments: action.payload.data,
        employeeId: action.payload.id,
      };
    case DELETE_RECORD:
      return {
        ...state,
        payments: state.payments?.filter(
          (payment) => payment._id !== action.payload
        ),
      };
    case CLEAR_CALENDER:
      return {
        ...state,
        employeeId: null,
        payments: null,
      };
    default:
      return state;
  }
};
