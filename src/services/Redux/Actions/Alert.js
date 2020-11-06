import {v4 as uuid} from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './types';

let isDisplaying = false;
let cautionType = '';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid();
  if (alertType !== cautionType) {
    dispatch({
      type: SET_ALERT,
      payload: {msg, alertType, id},
    });
    cautionType = alertType;
    isDisplaying = true;
    setTimeout(() => {
      cautionType = '';
      isDisplaying = false;
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, 4000);
  }
};
