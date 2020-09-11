import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {SecondSidebar} from '../component/second-sidebar';

const RegisterStepFour = () => {
  return (
    <div className="register-wrapper one">
      <SecondSidebar sideProgress={'four'} />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help? <span className="text-blue click ml-2">Click here</span>
          </div>
          <div className="px">
            <div className="mt-5 row">
              <div className="col-lg-7 col-md-8">
                <p className="font22 font-bold mb-2">
                  Complete with your Address details
                </p>
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
                              class="iconify"
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
                              class="iconify"
                              data-icon="mdi:city-variant-outline"
                              data-inline="false"
                            ></span>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="City"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              class="iconify"
                              data-icon="cil:location-pin"
                              data-inline="false"
                            ></span>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              class="iconify"
                              data-icon="cil:location-pin"
                              data-inline="false"
                            ></span>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Postal Code"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
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

export default RegisterStepFour;
