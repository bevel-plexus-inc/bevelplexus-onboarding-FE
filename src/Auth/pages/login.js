import React, {useState} from 'react';
import {Sidebar} from '../component/sidebar';
import {Link, useLocation} from 'react-router-dom';
import NeedHelp from '../component/needHelp';
import {Form, Input, Spin} from 'antd';
import {LOGIN} from '../../services/auth';
import {useMutation} from '@apollo/client';
import {setAlert} from '../../services/Redux/Actions/Alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';

const Login = ({setAlert, handleGeneralErrors, history}) => {
  
  const search = useLocation().search;
  const redirect_url = new URLSearchParams(search).get('redirect_url');
  const [formData, setFormData] = useState();
  const [loginUser, {loading}] = useMutation(LOGIN, {
    update(proxy, result) {
      const returnVal = result.data.login.user;
      if (result.data.login.token) {
        localStorage.removeItem('tempEnrollmentVerified')
        localStorage.removeItem('VerifyIdentity')
        localStorage.setItem('token', result.data.login.token);
        localStorage.setItem('user', JSON.stringify(result.data.login.user));
        localStorage.setItem('userId ', result.data.login.user.id);
      }
      if (redirect_url === null) {
        if (returnVal.userType === 'Student') {
          if (!returnVal.userVerification?.isEmailVerified) {
            history.push({pathname: `/show-mail`});
          } else if (!returnVal.userVerification?.isPhoneNumberVerified) {
            history.push({pathname: `/register-step-two`});
          } else if (returnVal.studentAccountDetail === null) {
            history.push({pathname: `/register-step-three`});
          } else if (!returnVal.userKyc?.isVerified) {
            history.push({pathname: `/register-step-four`});
          } else {
            window.location.href = 'https://www.app.bevelplexus.com/dashboard'
          }
        } else {
          if (!returnVal.userVerification?.isEmailVerified) {
            history.push({pathname: `/show-mail`});
          } else if (!returnVal.userVerification?.isPhoneNumberVerified) {
            history.push({pathname: `/register-step-two`});
          } else if (returnVal.regularAccountDetail === null) {
            history.push({pathname: `/register-step-three-regular`});
          } else if (!returnVal.userKyc?.isVerified) {
            history.push({pathname: `/register-step-four-regular`});
          } else {
            window.location.href = 'https://www.app.bevelplexus.com/dashboard'
          }
        }
      } else {
        history.push({pathname: `${redirect_url}`});
      }
    },
    onError(err) {
      handleGeneralErrors(err);
    },
    variables: formData,
  });

  const onFinish = (values) => {
    setFormData(values);
    loginUser();
  };

  return (
    <div className="register-wrapper one">
      <Sidebar />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help?{' '}
            <span
              className="text-blue click ml-2"
              data-toggle="modal"
              data-target="#helpModal"
            >
              Click here
            </span>
          </div>
          <div className="px body-centered">
            <div className="row">
              <div className="col-lg-6 text-center col-md-8 mx-auto">
                <div className="text-center">
                  <p className="font48 font-bold mb-2">Sign in</p>
                  <p className="text-grey">
                    Welcome back, we exist to make your money transfers as
                    affordable and seamless as possible.
                  </p>
                </div>

                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  className="pt-5"
                  onFinish={onFinish}
                >
                  <div className="form-group">
                    <span className="input-icon">
                      <span
                        className="iconify"
                        data-icon="carbon:email"
                        data-inline="false"
                      ></span>
                    </span>

                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: 'email',
                          message: 'This is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your email!',
                        },
                      ]}
                    >
                      <Input placeholder="Email" className="form-control" />
                    </Form.Item>
                  </div>
                  <div className="form-group">
                    <span className="input-icon">
                      <span
                        className="iconify"
                        data-icon="la:key-solid"
                        data-inline="false"
                      ></span>
                    </span>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Password"
                        className="form-control"
                      />
                    </Form.Item>
                  </div>

                  <div className="d-flex flex-wrap align-items-end justify-content-end">
                    <Link to="/forgot-password" className="text-blue click">
                      Forgot password?
                    </Link>
                  </div>
                  <Form.Item>
                    {loading ? (
                      <button
                        type="submit"
                        className="btn btn-blue btn-lg my-5"
                        disabled
                      >
                        Sign In
                        <span className="pl-4">
                          <Spin />
                        </span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-blue btn-lg my-5"
                      >
                        Sign In
                      </button>
                    )}
                  </Form.Item>
                  <div>
                    Dont have an account?
                    <Link to="/register" className="text-blue click ml-2">
                      Sign Up
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NeedHelp />
    </div>
  );
};
Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  handleGeneralErrors: PropTypes.func.isRequired,
};

export default connect(null, {setAlert, handleGeneralErrors})(Login);
