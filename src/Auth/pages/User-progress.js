import React from 'react';
import {connect} from 'react-redux';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {useQuery} from '@apollo/client';
import {GetUserVerification} from '../../services/auth';
import {setAlert} from '../../services/Redux/Actions/Alert';
import {useHistory} from 'react-router-dom';

const UserProgress = ({handleGeneralErrors, setAlert}) => {
  const history = useHistory();
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const userId = userDetails.id;
  const {error, data} = useQuery(GetUserVerification, {
    onCompleted(data) {
      console.log(data.getUserVerification);
      const detail = data.getUserVerification;
      if (!detail.isEmailVerified) {
        history.push({pathname: `/register`});
      } else if (userDetails.userType === 'Regular') {
        if (!detail.isPhoneNumberVerified) {
          history.push({pathname: `/register-step-two`});
        } else if (
          detail.isPhoneNumberVerified &&
          !detail.isSchoolEnrollmentVerified &&
          !detail.isIdentityVerified
        ) {
          history.push({pathname: `/register-step-three`});
        } else if (!detail.isSchoolEnrollmentVerified) {
          history.push({pathname: `/register-step-four`});
        } else if (!detail.isIdentityVerified) {
          history.push({pathname: `/register-step-four`});
        } else {
          history.push({pathname: `/transaction`});
        }
      } else {
        if (!detail.isPhoneNumberVerified) {
          history.push({pathname: `/register-step-two`});
        } else if (
          detail.isPhoneNumberVerified &&
          !detail.isSchoolEnrollmentVerified &&
          !detail.isIdentityVerified
        ) {
          history.push({pathname: `/register-step-three-regular`});
        } else if (!detail.isSchoolEnrollmentVerified) {
          history.push({pathname: `/register-step-four-regular`});
        } else if (!detail.isIdentityVerified) {
          history.push({pathname: `/register-step-four-regular`});
        } else {
          history.push({pathname: `/transaction`});
        }
      }
    },
    onError(error) {
      console.log(error);
      handleGeneralErrors(error);
      setAlert('Please Login to proceed with your registration');
    },
    variables: {userId},
  });

  return <div></div>;
};

export default connect(null, {handleGeneralErrors, setAlert})(UserProgress);
