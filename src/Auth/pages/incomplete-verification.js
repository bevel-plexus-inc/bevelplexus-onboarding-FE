import React, { useEffect } from 'react';

const CompleteVerification = ({ history }) => {
  const userDetails = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (userDetails.userType === 'Student') {
      if (!userDetails.userVerification?.isEmailVerified) {
        history.push({ pathname: `/show-mail` });
      } else if (!userDetails.userVerification?.isPhoneNumberVerified) {
        history.push({ pathname: `/register-phone` });
      } else if (userDetails.regularAccountDetail === null) {
        history.push({ pathname: `/register-address` });
      } else if (userDetails.studentAccountDetail === null) {
        history.push({ pathname: `/register-school` });
      } else if (!userDetails.userKyc?.isVerified) {
        history.push({ pathname: `/register-identity` });
      } else {
        window.location.href = 'https://app.bevelplexus.com/payment/dashboard'
      }
    } else {
      if (!userDetails.userVerification?.isEmailVerified) {
        history.push({ pathname: `/show-mail` });
      } else if (!userDetails.userVerification?.isPhoneNumberVerified) {
        history.push({ pathname: `/register-phone` });
      } else if (userDetails.regularAccountDetail === null) {
        history.push({ pathname: `/register-address` });
      } else if (!userDetails.userKyc?.isVerified) {
        history.push({ pathname: `/register-identity-regular` });
      } else {
        window.location.href = 'https://app.bevelplexus.com/payment/dashboard'
      }
    }
  }, [])

  return (
    <></>
  );
};


export default CompleteVerification;
