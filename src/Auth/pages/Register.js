import React from 'react';
import { Sidebar } from '../component/sidebar';
import regular from '../../assets/img/user-regular.svg';
import student from '../../assets/img/user-student.svg';
import { Link, useHistory } from 'react-router-dom';
import NeedHelp from '../component/needHelp';
import { Form, Input, Spin } from 'antd';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../services/auth';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { handleGeneralErrors } from '../../globalComponent/HandleGeneralErrors';

const UserType = {
  Student: 'Student',
  Regular: 'Regular',
};

const Register = ({ handleGeneralErrors }) => {
  const history = useHistory();
  const [userType, setUserType] = useState('');
  const [agreement, setAgreement] = useState(false);
  const checkBoxChange = (e) => {
    const val = e.target.checked;
    setAgreement(val);
  };

  const toggleRegularTab = () => {
    document.querySelector('.regular-tab').classList.add('active');
    document.querySelector('.student-tab').classList.remove('active');
    setUserType(UserType.Regular);
  };
  const toggleStudentTab = () => {
    document.querySelector('.student-tab').classList.add('active');
    document.querySelector('.regular-tab').classList.remove('active');
    setUserType(UserType.Student);
  };
  const [formData, setFormData] = useState();

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      if (result.data.signUp.token) {
        localStorage.removeItem('tempEnrollmentVerified')
        localStorage.removeItem('VerifyIdentity')
        localStorage.setItem('token', result.data.signUp.token);
        localStorage.setItem('user', JSON.stringify(result.data.signUp.user));
        localStorage.setItem('userId ', result.data.signUp.user.id);
        history.push('/show-mail');
      }
    },
    onError(err) {
      handleGeneralErrors(err);
    },
    variables: formData,
  });

  const onFinish = (values) => {
    if (values.referralCode === undefined) {
      values.referralCode = '';
    }
    if (userType === '') {
      toast.error('Please you need to select a user type to proceed');
    } else if (agreement === false) {
      toast.error('Please you need to agree with our policy to proceed');
    } else if (values.password !== values.confirmPassword) {
      toast.error('Password do not match!');
    } else {
      const data = {
        ...values,
        userType: userType,
      };
      setFormData(data);
      addUser();
    }
  }; 
  
  const onError = (values) => {
    console.log(values)
  };

  return (
    <div className="register-wrapper one">
      <ToastContainer />
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
          <div className="px">
            <div className="title-space row">
              <div className="col-lg-7 col-md-8">
                <p className="font22 font-bold mb-2">Create an Account</p>
                <p className="text-grey">
                  We take all necessary precautions to keep your Personal
                  Information protected.
                </p>
              </div>
            </div>
            <div className="my-4">
              <p className="font-bold">Choose the type of Account</p>
              <div className="d-flex register-tab">
                <div
                  className="each mr-4 d-flex align-items-center regular-tab"
                  onClick={toggleRegularTab}
                >
                  <div className="icon">
                    <img src={regular} alt="" />
                  </div>
                  <div>
                    <p>Regular Account</p>
                    <div className="detail-two">
                      Not a student? or <br /> not paying school related bills
                    </div>
                  </div>
                  <div className="detail">This option is for you</div>
                </div>
                <div
                  className="each d-flex align-items-center student-tab"
                  onClick={toggleStudentTab}
                >
                  <div className="icon">
                    <img src={student} alt="" />
                  </div>
                  <div>
                    <p>Student Account</p>
                    <div className="detail-two">
                      Seeking to study or currently <br /> studying in Canada?
                    </div>
                  </div>
                  <div className="detail">This option is for you</div>
                </div>
              </div>
            </div>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="my-5">
                <p className="font-bold">Fill with your details</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="carbon:user"
                          data-inline="false"
                        ></span>
                      </span>
                      <Form.Item
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your first name!',
                          },
                        ]}
                      >
                        <Input
                          placeholder="First name"
                          className="form-control"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="carbon:user"
                          data-inline="false"
                        ></span>
                      </span>
                      <Form.Item
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your last name!',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Last Name"
                          className="form-control"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-6">
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
                            message: 'The input is not valid E-mail!',
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
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="vaadin:password"
                          data-inline="false"
                        ></span>
                      </span>

                      <Form.Item
                        name="referralCode"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Input
                          placeholder="Referral Code (if you have one)"
                          className="form-control"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-6 pass-wrapper">
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
                          placeholder="Password"
                          className="form-control"
                        />
                      </Form.Item>
                      <div className='font10'>
                        Password must be at least 6 characters in length and must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and one of these special characters: !%@#$&*.
                    </div>
                    </div>

                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="input-icon">
                        <span
                          className="iconify"
                          data-icon="la:key-solid"
                          data-inline="false"
                        ></span>
                      </span>
                      <Form.Item
                        name="confirmPassword"
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
                        ]}
                      >
                        <Input.Password
                          placeholder="Confirm Password"
                          className="form-control"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="agreement-check">
                    <label className="check-container">
                      <input
                        type="checkbox"
                        onChange={(e) => checkBoxChange(e)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <div className="ml-5">
                      I agree with the
                      <a
                        href="https://bevelplexus.com/privacy-policy/"
                        target="_blanc"
                        className="text-blue"
                      >
                        {' '}
                        Privacy Policy
                      </a>{' '}
                      and the
                      <a
                        href="https://bevelplexus.com/terms-conditions/"
                        target="_blanc"
                        className="text-blue"
                      >
                        {' '}
                        Terms and Conditions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-5">
                <div className="d-flex flex-wrap align-items-end justify-content-end">
                  <div className="agreement-check text-grey mr-2">
                    Already have a login?{' '}
                    <Link to="/" className="text-blue click">
                      Sign in here
                    </Link>
                  </div>
                  <Form.Item className="mb-0">
                    <button
                      type="submit"
                      className="btn btn-blue btn-lg"
                      disabled={loading}
                    >
                      Create account
                      {loading && (
                        <span className="ml-4">
                          <Spin />
                        </span>
                      )}
                    </button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
      <NeedHelp />
    </div>
  );
};

export default connect(null, { handleGeneralErrors })(Register);
