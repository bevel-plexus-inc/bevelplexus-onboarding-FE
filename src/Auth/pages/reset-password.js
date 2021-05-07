import React, {useState} from 'react';
import {Sidebar} from '../component/sidebar';
import {Link} from 'react-router-dom';
import NeedHelp from '../component/needHelp';
import {Form, Input, Spin} from 'antd';
import {useMutation} from '@apollo/client';
import {setAlert} from '../../services/Redux/Actions/Alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {RESET_PASSWORD} from '../../services/auth';

const ResetPassword = ({setAlert, handleGeneralErrors, match, history}) => {
  const tokenParam = match.params.id;
  const [formData, setFormData] = useState();
  const [resetPassword, {loading}] = useMutation(RESET_PASSWORD, {
    update(proxy, result) {
      if (result.data.resetPassword.message) {
        setAlert(result.data.resetPassword.message);
        history.push({pathname: '/'});
      }
    },
    onError(err) {
      handleGeneralErrors(err);
    },
  });
  const onFinish = (values) => {
    if (values.password !== values.newPassword) {
      setAlert("There's a mismatch. Make sure its the same with the password above", 'error');
    } else {
      let payload = {
        password: values.password,
        formToken: tokenParam,
      };
      setFormData(payload);
      resetPassword({variables: payload});
    }
  };


  return (
    <div className="register-wrapper one reset-password-wrapper">
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
                  <p className="font30 font-bold mb-2">Reset Password</p>
                  <p className="text-grey">
                    Pick something you'll remember this time
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
                  <div className="form-group pass-wrapper">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="la:key-solid"
                          data-inline="false"
                        ></span>
                      </span>
                     
                      <Form.Item
                        name="newPassword"
                        rules={[
                          {
                            required: true,
                          },
                          {
                            min: 6,
                          },
                          {
                            pattern: new RegExp(/([A-Z])/),
                          },
                          {
                            pattern: new RegExp(/([!%@#$&*])/),
                          },
                          {
                            pattern: new RegExp(/([0-9])/),
                          },
                          {
                            pattern: new RegExp(/([a-z])/),
                          },
                        ]}
                      >
                        <Input.Password
                          placeholder="New Password"
                          className="form-control"
                        />
                      </Form.Item>
                      <div className='font10 text-left'>
                        Password must be at least 6 characters in length and must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 of these special characters: !%@#$&*.
                    </div>
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
                          message: 'Please confirm your password!',
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Confirm New Password"
                        className="form-control"
                      />
                    </Form.Item>
                  </div>
                  <button type="submit" className="btn btn-blue btn-lg my-5">
                    Reset Password
                    {loading && (
                      <span className="pl-4">
                        <Spin />
                      </span>
                    )}
                  </button>
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

export default connect(null, {setAlert, handleGeneralErrors})(ResetPassword);
