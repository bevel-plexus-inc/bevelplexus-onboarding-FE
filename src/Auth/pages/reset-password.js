import React from 'react';
import {Sidebar} from '../component/sidebar';
import {Link} from 'react-router-dom';
import NeedHelp from '../component/needHelp';

const ResetPassword = () => {
  return (
    <div className="register-wrapper one">
      <Sidebar />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help? <span className="text-blue click ml-2" data-toggle="modal" data-target="#helpModal">Click here</span>
          </div>
          <div className="px body-centered">
            <div className="row">
              <div className="col-lg-6 text-center col-md-8 mx-auto">
                <div className="text-center">
                  <p className="font30 font-bold mb-2">Reset Password</p>
                  <p className="text-grey">
                    Pick something youll remember this time
                  </p>
                </div>
                <form className="pt-5">
                  <div className="form-group">
                    <span className="input-icon">
                      <span
                        className="iconify"
                        data-icon="la:key-solid"
                        data-inline="false"
                      ></span>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="form-group">
                    <span className="input-icon">
                      <span
                        className="iconify"
                        data-icon="la:key-solid"
                        data-inline="false"
                      ></span>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm New Password"
                    />
                  </div>
                  <Link to="/">
                    <button className="btn btn-blue btn-lg my-5">
                      Reset Password
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NeedHelp/>
    </div>
  );
};

export default ResetPassword;
