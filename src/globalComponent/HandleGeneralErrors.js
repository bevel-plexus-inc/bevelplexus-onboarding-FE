import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { setAlert } from '../services/Redux/Actions/Alert';

export const handleGeneralErrors = (errors, history) => (dispatch) => {
  console.log(errors);
  if (errors.graphQLErrors.length < 1) {
    dispatch(setAlert('Please connect to the internet', 'error'));
    return;
  } else {
    console.log(errors.graphQLErrors);
    dispatch(setAlert(errors.graphQLErrors[0].message, 'error'));
  }
};
const handleGeneralErr = (errors, props) => {
  return <div></div>;
};

handleGeneralErrors.propTypes = {};
const mapStateToProps = (state) => ({
  errors: state.global.errors,
});

export default connect(mapStateToProps)(handleGeneralErr);
