import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {SecondSidebar} from '../component/second-sidebar';

const RegisterStepTwo = () => {
  const [value, setValue] = useState();
  return (
    <div className="register-wrapper">
      <SecondSidebar sideProgress={'two'} />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help? <span className="text-blue click ml-2">Click here</span>
          </div>
          <div className="px">
            <div className="d-body">
              <div>
                <div className="title-space row">
                  <div className="col-lg-7 col-md-8">
                    <p className="font22 font-bold mb-2">Verify your Number</p>
                    <p className="text-grey">
                      Add your phone number. We'll send you a verification code
                      so we know you're real.
                    </p>
                  </div>
                </div>
                <div className="my-5">
                  <form>
                    <div className="row">
                      <div className="col-xl-8 col-lg-10 col-md-10 mx-auto text-center">
                        <div className="form-group mr-3">
                          <span className="phone-input-icon">
                            <span
                              class="iconify"
                              data-icon="bi:phone"
                              data-inline="false"
                            ></span>
                          </span>
                          <PhoneInput
                            placeholder="Phone Number"
                            value={value}
                            onChange={setValue}
                          />
                        </div>

                        <Link to="/verify-code">
                          <button className="btn btn-blue btn-lg mt-4">
                            Send Code
                          </button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-auto mb-5">
                <div className="d-flex flex-wrap align-items-center justify-content-between font-bold text-grey agreement-check">
                  <div>PREVIOUS</div>
                  <div className="mr-2">SKIP FOR NOW</div>
                  <Link to="/register-step-three">
                    <button className="btn btn-grey btn-lg">Next</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterStepTwo;
