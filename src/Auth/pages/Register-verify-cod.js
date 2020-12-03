import React, {useEffect, useState} from 'react';
import {SecondSidebar} from '../component/second-sidebar';
import {Link} from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';
import NeedHelp from '../component/needHelp';
import {AUTHENTICATE_PHONE_NUMBER, VERIFY_PHONE} from '../../services/auth';
import {setAlert} from '../../services/Redux/Actions/Alert';
import {useMutation} from '@apollo/client';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {connect} from 'react-redux';
import {Spin} from 'antd';

const RegisterVerifyCode = ({
  location,
  handleGeneralErrors,
  setAlert,
  history,
}) => {
  const formData = location.state.formData;
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const [iserror, setiserror] = useState(false);
  const [code, setCode] = useState('');
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    StartTimer();
  }, []);

  const onCodeChange = (e) => {
    setCode(e);
  };

  const [verifyPhoneNumber, {loading}] = useMutation(VERIFY_PHONE, {
    update(proxy, result) {
      console.log(result);
      if (result.data.verifyPhoneNumber.message) {
        setAlert(result.data.verifyPhoneNumber.message);
        clearInterval(StartTimer);
        if (userDetails.userType === 'Regular') {
          history.push('/register-step-three-regular');
        } else {
          history.push('/register-step-three');
        }
      }
    },
    onError(err) {
      console.log(err);
      setiserror(true);
      handleGeneralErrors(err);
    },
  });

  const submitCode = (e) => {
    e.preventDefault();
    let payload = {
      phoneNumber: formData.phoneNumber,
      token: code,
    };
    verifyPhoneNumber({variables: payload});
  };

  let fiveMin = 60 * 5;

  const StartTimer = () => {
    setShowResend(false);
    const Timer = setInterval(() => {
      fiveMin--;
      let mins = Math.floor(fiveMin / 60);
      let secs = Math.floor(fiveMin % 60);
      secs < 10 ? (secs = `0${secs}`) : (secs = secs);
      if (document.querySelector('.timeResult') != null) {
        document.querySelector('.timeResult').innerHTML = `${mins}:${secs}`;
      }
      if (fiveMin < 1) {
        setShowResend(true);
        clearInterval(Timer);
      }
    }, 1000);
  };

  const [authenticatePhoneNumber, {loadin}] = useMutation(
    AUTHENTICATE_PHONE_NUMBER,
    {
      update(proxy, result) {
        console.log(result);
        if (result.data.authenticatePhoneNumber) {
          setAlert(result.data.authenticatePhoneNumber.message);
          StartTimer();
        }
      },
      onError(err) {
        handleGeneralErrors(err);
      },
      variables: formData,
    }
  );
  const resendCode = (e) => {
    e.preventDefault();
    authenticatePhoneNumber();
  };
  return (
    <div className="register-wrapper">
      <SecondSidebar sideProgress={'two'} />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help?{' '}
            <span
              className="text-blue click ml-2"
              data-toggle="modal"
              data-target="#helpModal"
            >
              Click here
            </span>
          </div>
          <div className="px">
            <div className="d-body">
              <div>
                <div className="title-space row">
                  <div className="col-lg-12">
                    <p className="font22 font-bold mb-2">Verify your Number</p>
                    <p className="text-grey">
                      Enter the 6-digit code that has been sent to{' '}
                      <span className="font-bold text-black">
                        {formData.phoneNumber}
                      </span>{' '}
                      <Link
                        to="/register-step-two"
                        className="font14 text-blue click"
                      >
                        Change number
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="my-5">
                  <form>
                    <div className="row">
                      <div className="col-xl-7 col-lg-8 col-md-9 col-sm-10 mx-auto text-center">
                        <div
                          className={
                            iserror
                              ? 'verify-input mr-3 p-4 error'
                              : 'verify-input mr-3 p-4'
                          }
                        >
                          <ReactCodeInput
                            type={'number'}
                            fields={6}
                            onChange={(e) => onCodeChange(e)}
                          />
                        </div>
                        {iserror ? (
                          <div className="my-3 text-grey">
                            The code typed was{' '}
                            <span className="text-red">wrong</span>. Please
                            retry
                          </div>
                        ) : (
                          <div className="my-3 text-grey">
                            The OTP will be expired in{' '}
                            <span className="text-black timeResult"></span>
                          </div>
                        )}

                        <button
                          className="btn btn-blue btn-lg mt-4"
                          onClick={(e) => submitCode(e)}
                        >
                          Verify Number
                        </button>
                        {showResend && (
                        <div className="mt-5 text-grey">
                          Didn't received the code?{' '}
                          <span
                            className="text-blue click"
                            onClick={(e) => resendCode(e)}
                          >
                            Resend it
                            {loading && (
                              <span className="ml-4">
                                <Spin />
                              </span>
                            )}
                          </span>
                        </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NeedHelp />
    </div>
  );
};

export default connect(null, {handleGeneralErrors, setAlert})(
  RegisterVerifyCode
);
