import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
  MUSTARD_POST,
  SET_TYPE,
  DATA_SENT,
  SENT_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_TYPE:
      return {
        ...state,
        type: action.payload,
        name: '',
        mobile: '',
        quantity: '',
        rate: '',
        transport: '',
        address: '',
        desc: '',
        containerType: '',
        identity: '',
        employee: '',
        amount: '',
        expenseType: '',
        total: '',
        paid: '',
        due: '',
      };
    default:
      return state;
  }
};
