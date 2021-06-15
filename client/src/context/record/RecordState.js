import React, { useReducer } from 'react';
import axios from 'axios';
import RecordContext from './recordContext';
import RecordReducer from './recordReducer';

import {
  UPDATE,
  LOAD_RECORD,
  CLEAR_RECORDS,
  CLEAR_LOAD_INPUT,
  DELETE_RECORD,
} from '../types';

const RecordState = (props) => {
  const initialState = {
    records: null,
    loadInput: null,
    trigger: false,
  };

  const [state, dispatch] = useReducer(RecordReducer, initialState);

  // Methods goes here
  const getRecords = async (type) => {
    if (!type) type = 'mustard';
    try {
      const res = await axios.get(`/api/${type}`);

      dispatch({ type: LOAD_RECORD, payload: res.data });
    } catch (err) {
      localStorage.removeItem('token');
    }
  };

  const clearRecords = () => {
    dispatch({ type: CLEAR_RECORDS });
  };

  const loadInputForm = (id) => {
    if (id) {
      dispatch({ type: UPDATE, payload: id });
    } else {
      console.log('update id is null valid');
    }
  };

  const clearLoadInput = () => {
    if (state.loadInput) dispatch({ type: CLEAR_LOAD_INPUT });
  };

  const deleteRecord = async (type, id) => {
    try {
      await axios.delete(`/api/${type}/${id}`);
      if (state.records) dispatch({ type: DELETE_RECORD, payload: id });
      else console.log('On Delete Record, records state is null');
    } catch (err) {
      console.log(err);
    }
  };

  const setPaymentToRecord = (payments) => {
    if (payments) {
      dispatch({ type: LOAD_RECORD, payload: payments });
    } else {
      console.log(
        'do not get payment in RecordState from paymentCalenderState'
      );
    }
  };

  return (
    <RecordContext.Provider
      value={{
        records: state.records,
        loadInput: state.loadInput,
        trigger: state.trigger,
        getRecords,
        clearRecords,
        loadInputForm,
        clearLoadInput,
        deleteRecord,
        setPaymentToRecord,
      }}
    >
      {props.children}
    </RecordContext.Provider>
  );
};

export default RecordState;
