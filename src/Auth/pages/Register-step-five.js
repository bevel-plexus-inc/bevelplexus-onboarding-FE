import React, {useState} from 'react';
import identity from '../../assets/img/identity.svg';
import enrollment from '../../assets/img/enrollment.svg';
import {Link} from 'react-router-dom';
import {SecondSidebar} from '../component/second-sidebar';
import axios from 'axios';

const RegisterStepFive = () => {
  const [percentageFile1, setpercentageFile1] = useState(0);

  const uploadFile = (e) => {
    console.log(e.target.files[0]);
    const file1 = e.target.files[0];
    let formData = new FormData();
    formData.append('file1', file1);
    const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        if (percent < 100) {
          setpercentageFile1(percent);
        }
      },
    };
    axios
      .post(
        'https://run.mocky.io/v3/7d9bf459-32de-4010-9dbc-e3c25ab6a917',
        formData,
        options
      )
      .then((res) => {
        console.log(res);
        setpercentageFile1(100);
        setTimeout(() => {
          setpercentageFile1('complete');
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setpercentageFile1('error');
      });
  };

  return (
    <div className="register-wrapper one">
      <SecondSidebar sideProgress={'five'} />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help? <span className="text-blue click ml-2">Click here</span>
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
              <div className="row file-upload-container">
                <div className="col-xl-9 col-lg-10 mx-auto">
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
                            1- Please upload a valid government issued
                            government identification in order to complete
                            verification for your account. This is required in
                            order to process any transactions you request.
                          </p>
                          <p className="font14 text-grey">
                            2- Please provide a clear, color picture of the
                            entire document. Screenshots are not allowed. JPG or
                            PNG only.
                          </p>
                        </div>
                        <div className="mt-auto">
                          {percentageFile1 <= 0 ? (
                            <>
                              <label
                                className="btn btn-upload"
                                for="chooseFile1"
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
                          ) : percentageFile1 > 0 ? (
                            <div class="progress-container">
                              <div
                                class="progress-inner text-center"
                                style={{width: `${percentageFile1}%`}}
                              >
                                {percentageFile1}%
                              </div>
                            </div>
                          ) : percentageFile1 === 'error' ? (
                            <>
                              <label
                                className="btn btn-outline-red"
                                for="chooseFile1"
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
                                <span className="text-red">
                                  {' '}
                                  File too large,
                                </span>
                                please re-upload with a max of 2Mb.
                              </p>
                            </>
                          ) : percentageFile1 === 'complete' ? (
                            <>
                              <button className="btn btn-green">
                                File Uploaded
                                <span
                                  class="iconify ml-2"
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
                            Identity verification
                          </p>
                          <p className="font14 text-grey">
                            1- Please upload a school issued identification,
                            admission letter or invoice that displays your full
                            name and student number. This is required in order
                            to process any transactions you request to your
                            school.
                          </p>
                        </div>
                        <div className="mt-auto">
                          <label className="btn btn-upload" for="chooseFile2">
                            Choose file
                          </label>
                          <input
                            type="file"
                            name="chooseFile2"
                            id="chooseFile2"
                            onChange={uploadFile}
                          />
                        </div>
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
                  <span className="text-blue click">Sign in here</span>
                </div>
                <Link to="/register-step-five">
                  <button className="btn btn-blue btn-lg">Next</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterStepFive;
