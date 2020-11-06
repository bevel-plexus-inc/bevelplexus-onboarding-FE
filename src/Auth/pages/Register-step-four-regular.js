import React, {useState} from 'react';
import identity from '../../assets/img/identity.svg';
import {Link, useHistory} from 'react-router-dom';
import {SecondSidebar} from '../component/second-sidebar';
import NeedHelp from '../component/needHelp';
import {useMutation} from '@apollo/client';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {connect} from 'react-redux';
import {VerifyIdentity} from '../../services/auth';

const RegisterStepFourRegular = ({handleGeneralErrors}) => {
  const history = useHistory();
  
  const registerStatus = localStorage.getItem('registerStatus')
  if(registerStatus !== 'complete3'){
    history.goBack()
  }
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const [percentageFile, setpercentageFile] = useState(0);
  // const [formData, setFormData] = useState({
  //   file: '',
  //   userId: userId,
  // });

  // const [registerID, {loading}] = useMutation(VerifyIdentity, {

  //   update(proxy, result) {
  //     console.log(result);
  //     setpercentageFile(100);
  //     setTimeout(() => {
  //       setpercentageFile('complete');
  //     }, 1000);
  //   },
  //   onError(err) {
  //     console.log(err);
  //     setpercentageFile('error');
  //     handleGeneralErrors(err);
  //   },
  //   variables: formData,
  // });

  const [registerID, {loading}] = useMutation(VerifyIdentity, {
    update(proxy, result) {
      console.log(result);
      setpercentageFile(100);
      localStorage.setItem('registerStatus', 'complete4');
      setTimeout(() => {
        setpercentageFile('complete');
      }, 1000);
    },
    onError(err) {
      console.log(err);
      setpercentageFile('error');
      handleGeneralErrors(err);
    },
  });

  const uploadFile = (e) => {
    let payload = {
      file: e.target.files[0],
      userId: userId,
    };
    console.log(payload);
    registerID({variables:payload});
  };

  // const uploadFile = (e) => {
  //   console.log(e.target.files[0]);
  //   setFormData({
  //     file: e.target.files[0],
  //     userId: userId,
  //   });
  //   console.log(formData)
  //   registerID();
   
  // };

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
                {/* <div className="col-xl-9 col-lg-10 mx-auto"> */}
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
                        {percentageFile <= 0 && !loading? (
                          <>
                            <label
                              className="btn btn-upload"
                              htmlFor="chooseFile1"
                            >
                              Choose file
                            </label>
                            <input
                              type="file"
                              name="chooseFile1"
                              id="chooseFile1"
                              onChange={uploadFile}
                            />
                          </>
                        ) : percentageFile > 0 ? (
                          <div className="progress-container">
                            <div
                              className="progress-inner text-center"
                              style={{width: `${percentageFile}%`}}
                            >
                              {percentageFile}%
                            </div>
                          </div>
                        ) : percentageFile === 'error' && !loading ? (
                          <>
                            <label
                              className="btn btn-outline-red"
                              htmlFor="chooseFile1"
                            >
                              Choose file
                            </label>
                            <input
                              type="file"
                              name="chooseFile1"
                              id="chooseFile1"
                              onChange={uploadFile}
                            />
                              <p className="mb-0 font12">
                              <span className="text-red mr-1">An error occured,</span>
                              please re-upload.
                            </p>
                          </>
                        ) : percentageFile === 'complete' ? (
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
                        { loading  && (
                          <div className="progress-container">
                            <div
                              className="progress-inner text-center"
                              style={{width: `${50}%`}}
                            >
                              {50}%
                            </div>
                          </div>
                        ) }
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
            <div className="pt-space">
              <div className="d-flex flex-wrap align-items-end justify-content-end">
                <div className="agreement-check text-grey mr-2">
                  Already have a login?{' '}
                  <span className="text-blue click">Sign in here</span>
                </div>
                <Link to="/register-step-four">
                  <button className="btn btn-blue btn-lg">Next</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NeedHelp />
    </div>
  );
};

export default connect(null, {handleGeneralErrors})(RegisterStepFourRegular);
