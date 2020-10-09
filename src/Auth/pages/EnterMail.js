import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import 'react-phone-number-input/style.css';
import { Sidebar } from '../component/sidebar';
import NeedHelp from '../component/needHelp';

const EnterMail = () => {
  const [mailSent, setMailSent] = useState(false)
  const sendMail = (e)=>{
    e.preventDefault()
    setMailSent(true)
  }
  return (
    <div className="register-wrapper">
      <Sidebar />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help? <span className="text-blue click ml-2" data-toggle="modal" data-target="#helpModal">Click here</span>
          </div>
          <div className="px">
            <div className="d-body">
              <div>
                <div className="title-space row">
                  <div className="col-lg-7 col-md-8">
                    <p className="font22 font-bold mb-2">Enter Email Address</p>
                    <p className="text-grey">
                      Input your email address. We'll send you a reset link to
                      you.
                    </p>
                  </div>
                </div>
                <div className="my-5">
                  <form>
                    <div className="row">
                      <div className="col-xl-8 col-lg-10 col-md-10 mx-auto text-center">
                        <form>
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
                        </form>
                        {mailSent ? (
                          <button className="btn btn-green btn-lg mt-4" disabled>
                            Link Sent
                          </button>
                        ) : (
                          <button className="btn btn-blue btn-lg mt-4" onClick={sendMail}>
                            Send Link
                          </button>
                        )}

                        <p className="text-grey mt-5">
                          Didn't receive the link?
                          <span className="click ml-2 text-blue" onClick={sendMail}>Resend it</span>
                        </p>
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
      <NeedHelp/>
    </div>
  );
};

export default EnterMail;
