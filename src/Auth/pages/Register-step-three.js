import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {SecondSidebar} from '../component/second-sidebar';
import NeedHelp from '../component/needHelp';

const RegisterStepThree = () => {
  const [dob, setdob] = useState();
  const dobChange = (e) => {
    console.log(e);
    setdob(e);
  };
  return (
    <div className="register-wrapper one">
      <SecondSidebar sideProgress={'three'} />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help? <span className="text-blue click ml-2" data-toggle="modal" data-target="#helpModal">Click here</span>
          </div>
          <div className="px">
            <div className="title-space row">
              <div className="col-lg-7 col-md-8">
                <p className="font22 font-bold mb-2">School Information</p>
                <p className="text-grey">
                  We take all necessary precautions to keep your Personal
                  Information protected.
                </p>
              </div>
            </div>
            <div className="my-5">
              <div className="row">
                <div className="col-xl-10 col-lg-12">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="ant-design:field-number-outlined"
                              data-inline="false"
                            ></span>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Student Number"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="ion:mail-outline"
                              data-inline="false"
                            ></span>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="School Email"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="ps:world"
                              data-inline="false"
                            ></span>
                          </span>
                          <select className="form-control">
                            <option value="">Country</option>
                            <option value="">Country</option>
                            <option value="">Country</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="cil:school"
                              data-inline="false"
                            ></span>
                          </span>
                          <select className="form-control">
                            <option value="">School</option>
                            <option value="">School</option>
                            <option value="">School</option>
                          </select>
                          <div className="info-icon ml-2">
                            <span
                              className="iconify"
                              data-icon="bi:info-circle"
                              data-inline="false"
                            ></span>
                          </div>
                          <div className="detail">
                            <div className="d-flex">
                              <div className="mr-2">
                                <span
                                  className="iconify"
                                  data-icon="bi:info-circle"
                                  data-inline="false"
                                ></span>
                              </div>
                              <div>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec est ligula, accumsan nec
                                fermentum nec, vulputate et tellus. In non
                                tellus et erat dapibus aliquet.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="cil:school"
                              data-inline="false"
                            ></span>
                          </span>
                          <select className="form-control">
                            <option value="">
                              Expected year of graduation
                            </option>
                            <option value="">School</option>
                            <option value="">School</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="cil:school"
                              data-inline="false"
                            ></span>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Course Studying"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="ic:outline-date-range"
                              data-inline="false"
                            ></span>
                          </span>
                          <DatePicker
                            className="form-control"
                            selected={dob}
                            name="dob"
                            placeholderText="Date of Birth"
                            onChange={(date) => dobChange(date)}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
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
      <NeedHelp/>
    </div>
  );
};

export default RegisterStepThree;
