import React, { useEffect } from 'react';

const CompleteVerification = ({ history }) => {
  const userDetails = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (userDetails.userType === 'Student') {
      if (!userDetails.userVerification?.isEmailVerified) {
        history.push({ pathname: `/show-mail` });
      } else if (!userDetails.userVerification?.isPhoneNumberVerified) {
        history.push({ pathname: `/register-step-two` });
      } else if (userDetails.regularAccountDetail === null) {
        history.push({ pathname: `/register-step-three-address` });
      } else if (userDetails.studentAccountDetail === null) {
        history.push({ pathname: `/register-step-three-school` });
      } else if (!userDetails.userKyc?.isVerified) {
        history.push({ pathname: `/register-step-four` });
      } else {
        window.location.href = 'https://app.bevelplexus.com/dashboard/payment'
      }
    } else {
      if (!userDetails.userVerification?.isEmailVerified) {
        history.push({ pathname: `/show-mail` });
      } else if (!userDetails.userVerification?.isPhoneNumberVerified) {
        history.push({ pathname: `/register-step-two` });
      } else if (userDetails.regularAccountDetail === null) {
        history.push({ pathname: `/register-step-three-address` });
      } else if (!userDetails.userKyc?.isVerified) {
        history.push({ pathname: `/register-step-four-regular` });
      } else {
        window.location.href = 'https://app.bevelplexus.com/dashboard/payment'
      }
    }
  }, [])

  return (
    <></>
  );
};


export default CompleteVerification;
