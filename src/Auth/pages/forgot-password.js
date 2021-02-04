import React, {useState} from 'react';
import {Sidebar} from '../component/sidebar';
import {Link, Redirect} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import NeedHelp from '../component/needHelp';

const ForgotPassword = (props) => {
  const [tabVal, setTabVal] = useState('');
  // const togglePhoneTab = () => {
  //   document.querySelector('.phone-tab').classList.add('active');
  //   document.querySelector('.mail-tab').classList.remove('active');
  //   setTabVal('phone');
  // };
  const toggleMailTab = () => {
    document.querySelector('.mail-tab').classList.add('active');
    // document.querySelector('.phone-tab').classList.remove('active');
    setTabVal('mail');
  };
  const nextLink = () => {
    if (tabVal === '') {
      toast.info('Please Select one of the options')
    } else if (tabVal === 'mail') {
      props.history.push({pathname: `/enter-mail`});
    } else {
      props.history.push({pathname: `/enter-number`});
    }
  };
  return (
    <div className="register-wrapper one">
    <ToastContainer />
      <Sidebar />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help? <span className="text-blue click ml-2" data-toggle="modal" data-target="#helpModal">Click here</span>
          </div>
          <div className="px">
            <div className="title-space pb-4">
              <p className="font22 font-bold mb-2">Forgot Password</p>
              <p className="text-grey">
                Oops, please select email to access your account
              </p>
            </div>
            <div className="mb-4 pt-5">
              <div className="row">
                <div className="col-lg-10 col-md-10 col-sm-12 mx-auto">
                  <div className="d-flex register-tab justify-content-center">
                    {/* <div
                      className="each mr-4 d-flex justify-content-center align-items-center phone-tab"
                      onClick={togglePhoneTab}
                    >
                      <div className="icon">
                        <span
                          className="iconify"
                          data-icon="bi:phone"
                          data-inline="false"
                        ></span>
                      </div>
                      <div>
                        <span className="font18">Send Code to Phone</span>
                      </div>
                    </div>
                     */}
                    <div
                      className="each d-flex justify-content-center align-items-center mail-tab"
                      onClick={toggleMailTab}
                    >
                      <div className="icon">
                        <span
                          className="iconify"
                          data-icon="bx:bx-envelope"
                          data-inline="false"
                        ></span>
                      </div>
                      <div>
                        <span className="font18">Send to Email</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="d-flex flex-wrap align-items-end justify-content-center">
                <button className="btn btn-blue btn-lg" onClick={nextLink}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NeedHelp/>
    </div>
  );
};

export default ForgotPassword;
