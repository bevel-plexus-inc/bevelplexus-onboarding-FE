import React, {useState} from 'react';
import {Sidebar} from '../component/sidebar';
import ReactCodeInput from 'react-verification-code-input';
import NeedHelp from '../component/needHelp';
import {useEffect} from 'react';
import {setAlert} from '../../services/Redux/Actions/Alert';
import {connect} from 'react-redux';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {Spin} from 'antd';
import {useMutation} from '@apollo/client';
import {REQUEST_RESET_PASSWORD, VALIDATE_RESET_OTP} from '../../services/auth';

const VerifyCode = ({location, setAlert, handleGeneralErrors, history}) => {
  const formData = location.state.formData;
  
  const [iserror, setiserror] = useState(false);
  const [code, setCode] = useState('');
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    StartTimer();
  }, []);

  const [resetPasswordRequest, {loadingg}] = useMutation(
    REQUEST_RESET_PASSWORD,
    {
      update(proxy, result) {
        if (result.data.resetPasswordRequest.message) {
          setAlert(result.data.resetPasswordRequest.message);
          StartTimer();
        }
      },
      onError(err) {
        console.log(err);
        handleGeneralErrors(err);
      },
    }
  );

  const [validateResetOTP, {loading}] = useMutation(VALIDATE_RESET_OTP, {
    update(proxy, result) {
      if (result.data.validateResetOTP.message) {
        setAlert(result.data.validateResetOTP.message);
        history.push({
          pathname: `/reset-password/${result.data.validateResetOTP.identifier}`,
        });
      }
    },
    onError(err) {
      console.log(err);
      setiserror(true);
      handleGeneralErrors(err);
    },
  });

  const onCodeChange = (e) => {
    setCode(e);
  };
  const resendCode = (e) => {
    e.preventDefault();
    setiserror(false);
    resetPasswordRequest({variables: formData});
  };
  const submitCode = (e) => {
    e.preventDefault();
    let payloadEmail = '';
    let payloadPhone = '';
    let payload = {};
    if (formData.email != null) {
      payloadEmail = formData.email;
    } else if (formData.phoneNumber != null) {
      payloadPhone = formData.phoneNumber;
    }
    payload = {
      email: payloadEmail,
      phoneNumber: payloadPhone,
      otp: code,
    };
    validateResetOTP({variables: payload});
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

  return (
    <div className="register-wrapper">
      <Sidebar />
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
                      Enter the 4-digit code that has been sent to{' '}
                      <span className="font-bold text-black">
                        {formData.phoneNumber}
                      </span>{' '}
                      <span className="font14 text-blue click">
                        Change number
                      </span>
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
                            <span className="text-black timeResult"> </span>
                          </div>
                        )}

                        <button
                          className="btn btn-blue btn-lg mt-4"
                          onClick={(e) => submitCode(e)}
                        >
                          Verify Number
                          {loading && (
                            <span className="ml-4">
                              <Spin />
                            </span>
                          )}
                        </button>
                        {showResend && (
                          <div className="mt-5 text-grey">
                            Didn't received the code?{' '}
                            <span
                              className="text-blue click"
                              data-toggle="modal"
                              data-target="#questionModal"
                            >
                              Resend it
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
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="questionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="questionModalTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="d-flex justify-content-between p-4">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Resend Code
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              Are you sure you want to resend this code? <br/> Click 'No' to cancel.
            </div>
            <div class="d-flex justify-content-center p-4">
              <button
                type="button"
                class="btn btn-outline-red btn-md mr-3"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                class="btn btn-blue btn-md"
                onClick={(e) => resendCode(e)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {setAlert, handleGeneralErrors})(VerifyCode);
