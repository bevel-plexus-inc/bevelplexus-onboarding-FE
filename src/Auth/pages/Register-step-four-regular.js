import React, {useEffect} from 'react';
import identity from '../../assets/img/identity.svg';
import {Link} from 'react-router-dom';
import SecondSidebar from '../component/second-sidebar';
import NeedHelp from '../component/needHelp';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {connect} from 'react-redux';
import FailedModal from '../component/FailedModal';
import SuccessModal from '../component/SuccessModal';

const RegisterStepFourRegular = () => {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const enrollmentVerified = userDetails?.userVerification.isIdentityVerified;
  const tempEnrollmentVerified = localStorage.getItem('tempEnrollmentVerified');
  const verifyId = localStorage.getItem('VerifyIdentity');
  useEffect(() => {
    if (verifyId && verifyId == 'success') {
      document.querySelector('.successModal').click();
    } else if (verifyId && verifyId == 'failed') {
      document.querySelector('.failedModal').click();
    }
  }, []);
  return (
    <div className="register-wrapper one">
      <SecondSidebar sideProgress={'four'} sideLink={'regular'} />
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
            <div className="title-space row">
              <div className="col-lg-7 col-md-8">
                <p className="font22 font-bold mb-2">Verification</p>
                <p className="text-grey">
                  Please ensure you follow the guidelines to complete your
                  verification process successfully.
                </p>
              </div>
            </div>
            <div className="my-5">
              <div className=" file-upload-container">
                <div className="row ">
                  <div className="col-md-6 my-3 mx-auto">
                    <div className="p-4 file-upload-wrapper box-shadow border-radius text-center">
                      <div>
                        <div className="my-4">
                          <img src={identity} alt="" />
                        </div>
                        <p className="font20 text-black font-bold">
                          Identity verification
                        </p>
                        <p className="font14 text-grey">
                          1- Please upload a valid government issued government
                          identification in order to complete verification for
                          your account. This is required in order to process any
                          transactions you request.
                        </p>
                        <p className="font14 text-grey">
                          2- Please provide a clear, color picture of the entire
                          document. Screenshots are not allowed. JPG or PNG
                          only.
                        </p>
                      </div>
                      <div className="mt-auto">
                        {enrollmentVerified || tempEnrollmentVerified ? (
                          <button className="btn btn-green">
                            Verified
                            <span
                              className="iconify ml-2"
                              data-icon="noto-v1:check-mark-button"
                              data-inline="false"
                            ></span>
                          </button>
                        ) : (
                          <a href="/verify-identity">
                            <label className="btn btn-upload">
                              Click to Verify
                            </label>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-space">
              <div className="d-flex flex-wrap align-items-end justify-content-end">
                <div className="agreement-check text-grey mr-2">
                  Already have a login?{' '}
                  <Link to="/" className="text-blue click">
                    Sign in here
                  </Link>
                </div>
                <Link to="/transaction">
                  <button className="btn btn-blue btn-lg">Next</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NeedHelp />
      <FailedModal />
      <SuccessModal />
      <span
        className="failedModal"
        data-toggle="modal"
        data-target="#failedModal"
      ></span>
      <span
        className="successModal"
        data-toggle="modal"
        data-target="#successModal"
      ></span>
    </div>
  );
};

export default connect(null, {handleGeneralErrors})(RegisterStepFourRegular);
