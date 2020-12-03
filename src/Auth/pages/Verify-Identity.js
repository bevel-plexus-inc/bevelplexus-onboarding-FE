import {useMutation, useQuery} from '@apollo/client';
import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import HandleGeneralErrors from '../../globalComponent/HandleGeneralErrors';
import {GetUserVerification} from '../../services/auth';
import {Sidebar} from '../component/sidebar';

const VerifyIdentity = ({HandleGeneralErrors, setAlert}) => {
  const history = useHistory();
  const userId = JSON.parse(localStorage.getItem('user')).id;

  const GetUserProgess = () => {
    console.log('I just tried')
    const {error, data} = useQuery(GetUserVerification, {
      onCompleted(data) {
        console.log(data.getUserVerification);
        const detail = data.getUserVerification;
        if (detail.userType === 'Student') {
          history.push('/register-step-four');
        } else {
          history.push('/register-step-four-regular');
        }
      },
      onError(error) {
        console.log(error);
        HandleGeneralErrors(error);
        setAlert('Please Login to proceed with your registration');
      },
      variables: {userId},
    });
  };

  return (
    <>
      <body className="register-wrapper">
        <Sidebar />
        <section className="main-auth-content">
          <div id="vouched-element" style={{height: '100vh'}}></div>
        </section>
      </body>
    </>
  );
};

export default connect(null, {HandleGeneralErrors})(VerifyIdentity);
