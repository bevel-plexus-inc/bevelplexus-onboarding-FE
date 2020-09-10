import React, {useState} from 'react';
import identity from '../../assets/img/identity.svg';
import enrollment from '../../assets/img/enrollment.svg';
import {Link} from 'react-router-dom';
import {SecondSidebar} from '../component/second-sidebar';

const RegisterStepFive = () => {
  const [dob, setdob] = useState();
  const dobChange = (e) => {
    console.log(e);
    setdob(e);
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
            <div className="mt-5 row">
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
                          <button className="btn btn-upload">
                            Choose file
                          </button>
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
                          <button className="btn btn-upload">
                            Choose file
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-space">
              <div className="d-flex flex-wrap align-items-center justify-content-end">
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
