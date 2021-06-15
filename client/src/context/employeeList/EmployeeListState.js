import React, { useReducer } from 'react';
import axios from 'axios';
import EmployeeListContext from './employeeListContext';
import employeeListReducer from './employeeListReducer';

import { EMP_LOADED, SET_EMP, SET_CURR_EMP } from '../types';

const EmployeeListState = (props) => {
  const initialState = {
    employees: null,
    currentEmp: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(employeeListReducer, initialState);

  const loadEmployees = async () => {
    try {
      const res = await axios.get(`/api/employees`);
      dispatch({ type: EMP_LOADED, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const setEmp = async (id) => {
    // load an emp
    console.log('employee set', id);
    try {
      dispatch({ type: SET_EMP, payload: id });
    } catch (err) {
      console.log(err);
    }
  };

  const setCurrentEmp = (data) => {
    // update currentEmp
    dispatch({ type: SET_CURR_EMP, payload: data });
  };

  return (
    <EmployeeListContext.Provider
      value={{
        employees: state.employees,
        currentEmp: state.currentEmp,
        loading: state.loading,
        error: state.error,
        loadEmployees,
        setEmp,
        setCurrentEmp,
      }}
    >
      {props.children}
    </EmployeeListContext.Provider>
  );
};

export default EmployeeListState;
