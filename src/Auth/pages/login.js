import React from 'react';
import {Sidebar} from '../component/sidebar';
import regular from '../../assets/img/user-regular.svg';
import student from '../../assets/img/user-student.svg';
import {Link} from 'react-router-dom';
import NeedHelp from '../component/needHelp';

const Login = () => {

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
                  <p className="font48 font-bold mb-2">Sign in</p>
                  <p className="text-grey">
                    Welcome back, we exsist to make your money transfers as
                    affordable and seamless as possible.
                  </p>
                </div>
                <form className='pt-5'>
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
                  <div className="form-group">
                    <span className="input-icon">
                    <span className="iconify" data-icon="la:key-solid" data-inline="false"></span>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <div className="d-flex flex-wrap align-items-end justify-content-end">
                    <Link to="/forgot-password" className="text-blue click">
                      Forgot password?
                    </Link>
                  </div>

                  <button className="btn btn-blue btn-lg my-5">Sign In</button>
                </form>
                <div>
                  Dont have an account?
                  <Link to="/register" className="text-blue click ml-2">
                    Sign Up
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

export default Login;
