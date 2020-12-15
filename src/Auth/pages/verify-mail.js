import React, {useState} from 'react';
import {Sidebar} from '../component/sidebar';
import mailBox from '../../assets/img/mailBox.svg';
import {Link} from 'react-router-dom';
import NeedHelp from '../component/needHelp';
import {Spin} from 'antd';
import { setAlert } from '../../services/Redux/Actions/Alert';
import { handleGeneralErrors } from '../../globalComponent/HandleGeneralErrors';
import { useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import { ResentEmailOTP } from '../../services/auth';

const ShowMail = ({handleGeneralErrors, setAlert, history}) => {
  const email = JSON.parse(localStorage.getItem('user')).email;

  const [resentEmailOTP, {loading}] = useMutation(ResentEmailOTP, {
    update(proxy, result) {
      console.log(result)
      if (result.data.resentEmailOTP.message) {
        setAlert(result.data.resentEmailOTP.message, 'success');
      }
    },
    onError(err) {
      console.log(err);
      handleGeneralErrors(err);
    },
  });

  const resendMail = (e) => {
    e.preventDefault();
    resentEmailOTP({variables: {email: email}});
  };

  return (
    <div className="register-wrapper one">
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
          <div className="px d-body">
            <div>
              <div className="title-space">
                <p className="font22 font-bold mb-2">You’ve got a Mail!</p>
                <p className="text-grey">
                  We have sent a verification email to {email}
                  <br />
                  Please click the link sent to your email to continue
                </p>
              </div>
              <div className="pt-5 row">
                <div className="col-lg-6 col-md-7 col-sm-12 mx-auto text-center">
                  <img src={mailBox} alt="" className="w-100" />
                  <div className="agreement-check text-grey mt-5">
                    Didn't receive the email?
                    {loading ? (
                      <span className="text-blue ml-2">
                        <Spin />
                      </span>
                    ) : (
                      <span
                        className="text-blue click ml-2"
                        data-toggle="modal"
                        data-target="#questionModal"
                      >
                        Resend Now
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-auto pb-4">
            <Link
              to="/register-step-two"
              className=" text-grey click ml-2 mt-auto"
            >
              <button className="btn btn-grey btn-lg">Next</button>
            </Link>
          </div>
        </div>
      </section>
      <NeedHelp />

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="questionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="questionModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="d-flex justify-content-between p-4">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Resend Verification Link
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              Are you sure you want to resend this verification link? <br /> Click 'No' to
              cancel.
            </div>
            <div className="d-flex justify-content-center p-4">
              <button
                type="button"
                className="btn btn-outline-red btn-md mr-3"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-blue btn-md"
                data-dismiss="modal"
                onClick={(e)=>resendMail(e)}
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


export default connect(null, {setAlert, handleGeneralErrors})(ShowMail);

