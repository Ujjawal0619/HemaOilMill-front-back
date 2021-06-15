import React, { useReducer } from 'react';
import axios from 'axios';
import InputContext from './inputContext';
import InputReducer from './inputReducer';

import { SET_TYPE, DATA_SENT, SENT_ERROR } from '../types';

const InputState = (props) => {
  const initialState = {
    type: null,
  };

  const [state, dispatch] = useReducer(InputReducer, initialState); //

  // when clicked on drawer option
  const setType = (type) => {
    dispatch({ type: SET_TYPE, payload: type });
  };

  // when submit form
  const postInput = async (formData, type) => {
    console.log(formData);
    try {
      const res = await axios.post(`/api/${type}`, formData);
      dispatch({ type: DATA_SENT, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: SENT_ERROR, payload: err.response });
    }
  };
  // Upadat
  const updateInput = async (formData, type) => {
    try {
      const res = await axios.put(`/api/${type}/${formData._id}`, formData);
      dispatch({ type: DATA_SENT, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: SENT_ERROR, payload: err.response });
    }
  };
  return (
    <InputContext.Provider
      value={{
        type: state.type,
        setType,
        postInput,
        updateInput,
      }}
    >
      {props.children}
    </InputContext.Provider>
  );
};

export default InputState;
