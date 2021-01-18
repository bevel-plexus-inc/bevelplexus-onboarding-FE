import React, {useEffect, useState} from 'react';
import identity from '../../assets/img/identity.svg';
import enrollment from '../../assets/img/enrollment.svg';
import {Link, useHistory} from 'react-router-dom';
import SecondSidebar from '../component/second-sidebar';
import NeedHelp from '../component/needHelp';
import {useMutation} from '@apollo/client';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {connect} from 'react-redux';
import {VerifyIdentity, verifyEnrollment} from '../../services/auth';
import FailedModal from '../component/FailedModal';
import SuccessModal from '../component/SuccessModal';

const RegisterStepFourStud = ({handleGeneralErrors}) => {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const enrollmentVerified = userDetails?.userVerification?.isIdentityVerified;
  const tempEnrollmentVerified = localStorage.getItem('tempEnrollmentVerified');
  const verifyId = localStorage.getItem('VerifyIdentity');
  useEffect(() => {
    if (verifyId && verifyId == 'success') {
      document.querySelector('.successModal').click();
    } else if (verifyId && verifyId == 'failed') {
      document.querySelector('.failedModal').click();
    }
  }, []);
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const [percentageFile, setpercentageFile] = useState(0);
  const [percentageFile2, setpercentageFile2] = useState(0);
  const [formData, setFormData] = useState({
    file: '',
    userId: userId,
  });

  const [registerEnrollment, {loading}] = useMutation(verifyEnrollment, {
    update(proxy, result) {
      setpercentageFile2(100);
      setTimeout(() => {
        setpercentageFile2('complete');
      }, 1000);
    },
    onError(err) {
      setpercentageFile2('error');
      handleGeneralErrors(err);
    },
    variables: formData,
  });

  const uploadFile = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      let payload = {
        file: file,
        userId: userId,
      };
      registerEnrollment({variables: payload});
    }
  };

  return (
    <div className="register-wrapper one">
      <SecondSidebar sideProgress={'four'} />
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
                <p className="font22 font-bold mb-2">Documents upload</p>
                <p className="text-grey">
                  We take all necessary precautions to keep your Personal
                  Information protected.
                </p>
              </div>
            </div>
            <div className="my-5">
              <div className=" file-upload-container">
                <div className="row ">
                  <div className="col-md-6 my-3">
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
                  <div className="col-md-6 my-3">
                    <div className="p-4 file-upload-wrapper box-shadow border-radius text-center">
                      <div>
                        <div className="my-4">
                          <img src={enrollment} alt="" />
                        </div>
                        <p className="font20 text-black font-bold">
                          Enrollment Verification
                        </p>
                        <p className="font14 text-grey">
                          1- Please upload a school issued identification,
                          admission letter or invoice that displays your full
                          name and student number. This is required in order to
                          process any transactions you request to your school.
                        </p>
                      </div>
                      <div className="mt-auto">
                        {percentageFile2 <= 0 && !loading ? (
                          <>
                            <label
                              className="btn btn-upload"
                              htmlFor="chooseFile2"
                            >
                              Choose file
                            </label>
                            <input
                              type="file"
                              name="chooseFile2"
                              id="chooseFile2"
                              onChange={uploadFile}
                            />
                          </>
                        ) : percentageFile2 > 0 ? (
                          <div className="progress-container">
                            <div
                              className="progress-inner text-center"
                              style={{width: `${percentageFile2}%`}}
                            >
                              {percentageFile2}%
                            </div>
                          </div>
                        ) : percentageFile2 === 'error' && !loading ? (
                          <>
                            <label
                              className="btn btn-outline-red"
                              htmlFor="chooseFile2"
                            >
                              Choose file
                            </label>
                            <input
                              type="file"
                              name="chooseFile2"
                              id="chooseFile2"
                              onChange={uploadFile}
                            />
                            <p className="mb-0 font12">
                              <span className="text-red mr-1">
                                An error occured,
                              </span>{' '}
                              please re-upload.
                            </p>
                          </>
                        ) : percentageFile2 === 'complete' ? (
                          <>
                            <button className="btn btn-green">
                              File Uploaded
                              <span
                                className="iconify ml-2"
                                data-icon="noto-v1:check-mark-button"
                                data-inline="false"
                              ></span>
                            </button>
                            <p className="mb-0 font12">
                              Thank you, document well{' '}
                              <span className="text-green">received!</span>
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                        {loading && (
                          <div className="progress-container">
                            <div
                              className="progress-inner text-center"
                              style={{width: `${50}%`}}
                            >
                              {50}%
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-space">
              <div className="d-flex flex-wrap align-items-end justify-content-end">
               
                <Link to="/dashboard">
                  <button className="btn btn-blue btn-lg" disabled={!enrollmentVerified}>Next</button>
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

export default connect(null, {handleGeneralErrors})(RegisterStepFourStud);
