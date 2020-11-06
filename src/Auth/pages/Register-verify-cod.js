import React, {useState} from 'react';
import {SecondSidebar} from '../component/second-sidebar';
import {Link} from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';
import NeedHelp from '../component/needHelp';
import {AUTHENTICATE_PHONE_NUMBER} from '../../services/auth';
import {setAlert} from '../../services/Redux/Actions/Alert';
import {useMutation} from '@apollo/client';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {connect} from 'react-redux';
import {Spin} from 'antd';

const RegisterVerifyCode = ({location, handleGeneralErrors, setAlert, history}) => {
  const userdetails = JSON.parse(localStorage.getItem('user'))
  const formData = location.state.formData;
  console.log(formData);
  const userDetails = JSON.parse(localStorage.getItem('user'))
  console.log(userDetails)
  const [iserror, setiserror] = useState(false);
  const [code, setCode] = useState("")
  const onCodeChange = (e) => {
    console.log(e)
    setCode(e);
  };
  const submitCode = (e) => {
    e.preventDefault();
    console.log(userdetails)
    if(userDetails.userType == 'Regular'){
      localStorage.setItem('registerStatus', 'complete2');
      history.push('/register-step-three-regular');
      clearInterval(StartTimer)
    }else{
      localStorage.setItem('registerStatus', 'complete2');
      history.push('/register-step-three');
      clearInterval(StartTimer)
    }
    // setiserror(true);
  };
  let fiveMin = 60 * 5;

  const StartTimer = setInterval(() => {
    fiveMin--;
    let mins = Math.floor(fiveMin / 60);
    let secs = Math.floor(fiveMin % 60);
    secs < 10 ? (secs = `0${secs}`) : (secs = secs);
    if (document.querySelector('.timeResult') != null) {
      document.querySelector('.timeResult').innerHTML = `${mins}:${secs}`;
      if (fiveMin < 1) {
        clearInterval(StartTimer);
      }
    }
  }, 1000);
  const [authenticatePhoneNumber, {loading}] = useMutation(
    AUTHENTICATE_PHONE_NUMBER,
    {
      update(proxy, result) {
        console.log(result);
        if (result.data.authenticatePhoneNumber) {
          setAlert(result.data.authenticatePhoneNumber.message);
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
                          <ReactCodeInput fields={6} onChange={(e)=>onCodeChange(e)}/>
                        </div>
                        {iserror ? ( 
                          <div className="my-3 text-grey">
                            The code typed was{' '}
                            <span className="text-red">wrong</span>.  Please
                            retry
                          </div>
                        ) : (
                          <div className="my-3 text-grey">
                            The OTP will be expired in{' '}
                            <span className="text-black timeResult"></span>
                          </div>
                        )}

                        <button className="btn btn-blue btn-lg mt-4" onClick={(e) => submitCode(e)}>
                          Verify Number
                        </button>
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
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-auto mb-5">
                <div className="d-flex flex-wrap align-items-center justify-content-between font-bold text-grey agreement-check">
                  <div>PREVIOUS</div>
                  <div className="mr-2">SKIP FOR NOW</div>
                    <button className="btn btn-grey btn-lg">Next</button>
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
