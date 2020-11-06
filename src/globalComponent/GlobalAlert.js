import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GlobalAlert = ({alerts}) => {
  const showToast = (msg, type) => {
    type === 'error'
      ? toast.error(msg)
      : type === 'success'
      ? toast.success(msg)
      : type === 'warn'
      ? toast.warn(msg)
      : toast.info(msg);
  };
  alerts != null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      return (
        <div key={alert.id} role="alert">
          {showToast(alert.msg, alert.alertType)}
        </div>
      );
    });
  return <ToastContainer />;
};
GlobalAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(GlobalAlert);
