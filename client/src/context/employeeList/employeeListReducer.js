import { EMP_LOADED, SET_EMP, SET_CURR_EMP } from '../types';

export default (state, action) => {
  switch (action.type) {
    case EMP_LOADED:
      return {
        ...state,
        employees: action.payload,
        currentEmp: null,
      };
    case SET_EMP:
      return {
        ...state,
        currentEmp: state.employees.filter(
          (employee) => employee._id === action.payload
        )[0],
      };
    case SET_CURR_EMP:
      return {
        ...state,
        currentEmp: action.payload,
      };
    default:
      return state;
  }
};
