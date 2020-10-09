import React from 'react';
import {Sidebar} from '../component/sidebar';
import regular from '../../assets/img/user-regular.svg';
import student from '../../assets/img/user-student.svg';
import {Link} from 'react-router-dom';
import NeedHelp from '../component/needHelp';

const Register = (props) => {
  const toggleRegularTab = () => {
    document.querySelector('.regular-tab').classList.add('active');
    document.querySelector('.student-tab').classList.remove('active');
  };
  const toggleStudentTab = () => {
    document.querySelector('.student-tab').classList.add('active');
    document.querySelector('.regular-tab').classList.remove('active');
  };
  return (
    <div className="register-wrapper one">
      <Sidebar />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help? <span className="text-blue click ml-2" data-toggle="modal" data-target="#helpModal">Click here</span>
          </div>
          <div className="px">
            <div className="title-space row">
              <div className="col-lg-7 col-md-8">
                <p className="font22 font-bold mb-2">Create an Account</p>
                <p className="text-grey">
                  We take all necessary precautions to keep your Personal
                  Information protected.
                </p>
              </div>
            </div>
            <div className="my-4">
              <p className="font-bold">Choose the type of Account</p>
              <div className="d-flex register-tab">
                <div
                  className="each mr-4 d-flex align-items-center regular-tab"
                  onClick={toggleRegularTab}
                >
                  <div className="icon">
                    <img src={regular} alt="" />
                  </div>
                  <div>
                    <p>Regular Account</p>
                    <div className="detail-two">
                      Lorem ipsum dolor sit amet, <br /> adipiscing elit.
                    </div>
                  </div>
                  <div className="detail">Lorem ipsum dolor sit ame.</div>
                </div>
                <div
                  className="each d-flex align-items-center student-tab"
                  onClick={toggleStudentTab}
                >
                  <div className="icon">
                    <img src={student} alt="" />
                  </div>
                  <div>
                    <p>Student Account</p>
                    <div className="detail-two">
                      Lorem ipsum dolor sit amet, <br /> adipiscing elit.
                    </div>
                  </div>
                  <div className="detail">Lorem ipsum dolor sit ame.</div>
                </div>
              </div>
            </div>
            <div className="my-5">
              <p className="font-bold">Fill with your details</p>
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="carbon:user"
                          data-inline="false"
                        ></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="carbon:user"
                          data-inline="false"
                        ></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="carbon:email"
                          data-inline="false"
                        ></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="vaadin:password"
                          data-inline="false"
                        ></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Referral Code (if you have one)"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="la:key-solid"
                          data-inline="false"
                        ></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="la:key-solid"
                          data-inline="false"
                        ></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div className="d-flex">
                <div className="agreement-check">
                  <label className="check-container">
                    <input type="checkbox" check />
                    <span className="checkmark"></span>
                  </label>
                  <div className="ml-5">
                    I agree with the{' '}
                    <span className="text-blue">Privacy Policy</span> and the{' '}
                    <span className="text-blue">Terms and Conditions</span>{' '}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-space">
              <div className="d-flex flex-wrap align-items-end justify-content-end">
                <div className="agreement-check text-grey mr-2">
                  Already have a login?{' '}
                  <Link to='/' className="text-blue click">Sign in here</Link>
                </div>
                <Link to="/show-mail">
                  <button className="btn btn-blue btn-lg">
                    Create account
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NeedHelp/>
    </div>
  );
};

export default Register;
