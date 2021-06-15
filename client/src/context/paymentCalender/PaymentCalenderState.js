import React, { useReducer } from 'react';
import axios from 'axios';
import PaymentCalenderContext from './paymentCalenderContext';
import paymentCalenderReducer from './paymentCalenderReducer';

import {
  LOAD_PAYMENTS,
  DELETE_RECORD,
  CLEAR_LOAD_INPUT,
  CLEAR_CALENDER,
} from '../types';

const PaymentCalenderState = (props) => {
  const initialState = {
    employeeId: null,
    payments: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(paymentCalenderReducer, initialState);

  const loadPayments = async (id) => {
    try {
      const res = await axios.get(`/api/payments/${id}`);
      dispatch({ type: LOAD_PAYMENTS, payload: { data: res.data, id } });
    } catch (err) {
      console.log(err);
    }
  };

  const postPayment = async (newPayment) => {
    try {
      const res = await axios.post(
        `/api/payments/${state.employeeId}`,
        newPayment
      );
      loadPayments(state.employeeId);
    } catch (err) {
      console.log(err);
    }
  };

  const updatePayment = async (formData) => {
    try {
      const res = await axios.put(`/api/payments/${formData._id}`, formData);
      loadPayments(state.employeeId);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`/api/payments/${id}`);
      dispatch({ type: DELETE_RECORD, payload: id });
    } catch (err) {
      console.log(err);
    }
  };

  const clearCalender = () => {
    dispatch({ type: CLEAR_CALENDER });
  };

  return (
    <PaymentCalenderContext.Provider
      value={{
        employeeId: state.employeeId,
        payments: state.payments,
        loading: state.loading,
        error: state.error,
        loadPayments,
        deletePayment,
        postPayment,
        updatePayment,
        clearCalender,
      }}
    >
      {props.children}
    </PaymentCalenderContext.Provider>
  );
};

export default PaymentCalenderState;
