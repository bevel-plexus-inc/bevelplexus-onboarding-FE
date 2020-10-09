import React, {useState} from 'react';
import {SecondSidebar} from '../component/second-sidebar';
import {Link} from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import NeedHelp from '../component/needHelp';

const RegisterVerifyCode = () => {
  const [iserror, setiserror] = useState(false);
  const submitCode = (e) => {
    e.preventDefault();
    setiserror(true);
  };

  return (
    <div className="register-wrapper"> 
    <SecondSidebar sideProgress={'two'} />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help? <span className="text-blue click ml-2" data-toggle="modal" data-target="#helpModal">Click here</span>
          </div>
          <div className="px">
            <div className="d-body">
              <div>
                <div className="title-space row">
                  <div className="col-lg-12">
                    <p className="font22 font-bold mb-2">Verify your Number</p>
                    <p className="text-grey">
                      Enter the 6-digit code that has been sent to{' '}
                      <span className="font-bold text-black">
                        +65 35326483.
                      </span>{' '}
                      <span className="font14 text-blue click">
                        Change number
                      </span>
                    </p>
                  </div>
                </div>
                <div className="my-5">
                  <form>
                    <div className="row">
                      <div className="col-xl-7 col-lg-8 col-md-9 col-sm-10 mx-auto text-center">
                        <div
                          className={
                            iserror
                              ? 'verify-input mr-3 p-4 error'
                              : 'verify-input mr-3 p-4'
                          }
                        >
                          <VerificationInput length={5} />
                        </div>
                        {iserror ? (
                          <div className="my-3 text-grey">
                            The code typed was{' '}
                            <span className="text-red">wrong</span>. A new code
                            was sent.
                          </div>
                        ) : (
                          <div className="my-3 text-grey">
                            The OTP will be expired in{' '}
                            <span className="text-black">5:59 </span>
                          </div>
                        )}

                        <button
                          
                          className="btn btn-blue btn-lg mt-4"
                        >
                          Verify Number
                        </button>
                        <div className="mt-5 text-grey">
                          Didn't received the code?{' '}
                          <span className="text-blue click">Resend it</span>
                        </div>
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

export default RegisterVerifyCode;
