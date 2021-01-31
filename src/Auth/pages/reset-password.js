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
        setAlert(result.data.resetPassword.message, 'success');
        history.push({pathname: '/'});
      }
    },
    onError(err) {
      handleGeneralErrors(err);
    },
  });
  const onFinish = (values) => {
    if (values.password != values.newPassword) {
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
                  <div className="form-group">
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
                            message: 'Please input your password!',
                          },
                          {
                            min: 6,
                            message: 'Minimum of 6 characters',
                          },
                          {
                            pattern: new RegExp(/([A-Z])/),
                            message:
                              'Please ensure your password contains a capital letter',
                          },
                          {
                            pattern: new RegExp(/([!% @#$&*])/),
                            message:
                              'Please ensure your password contains at least one of these special characters: !%@#$&*',
                          },
                          {
                            pattern: new RegExp(/([0-9])/),
                            message:
                              'Please ensure your password contains a number',
                          },
                          {
                            pattern: new RegExp(/([a-z])/),
                            message:
                              'Please ensure your password contains a small letter',
                          },
                        ]}
                      >
                        <Input.Password
                          placeholder="New Password"
                          className="form-control"
                        />
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
                          message: 'Required!',
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
