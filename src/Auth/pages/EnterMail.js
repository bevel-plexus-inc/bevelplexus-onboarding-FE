import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import 'react-phone-number-input/style.css';
import {Sidebar} from '../component/sidebar';
import NeedHelp from '../component/needHelp';
import {REQUEST_RESET_PASSWORD} from '../../services/auth';
import {useMutation} from '@apollo/client';
import {setAlert} from '../../services/Redux/Actions/Alert';
import {connect} from 'react-redux';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {Input, Spin, Form} from 'antd';

const EnterMail = ({setAlert, handleGeneralErrors, history}) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  if(userId === null){
    setAlert('Please you need to register first')
  }
  const [mailSent, setMailSent] = useState(false);
  const [formData, setFormData] = useState({});

  const [resetPasswordRequest, {loading}] = useMutation(
    REQUEST_RESET_PASSWORD,
    {
      update(proxy, result) {
        if (result.data.resetPasswordRequest) {
          setMailSent(true);
        }
        setAlert(result.data.resetPasswordRequest.message, 'success');
        
      },
      onError(err) {
        console.log(err);
        handleGeneralErrors(err);
      },
      variables: formData,
    }
  );

  const onFinish = (values) => {
    const data = {
      email: values.email,
      userId: userId,
    };
    setFormData(data);
    resetPasswordRequest();
  };

 

  const goToNext = () =>{
    history.push({pathname: '/verify-code', state: {formData}});
  }
  return (
    <div className="register-wrapper">
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
            <div className="d-body">
              <div>
                <div className="title-space row">
                  <div className="col-lg-7 col-md-8">
                    <p className="font22 font-bold mb-2">Enter Email Address</p>
                    <p className="text-grey">
                      Input your email address. We'll send you a reset link 
                    </p>
                  </div>
                </div>
                <div className="my-5">
                  <Form onFinish={onFinish} >
                    <div className="row">
                      <div className="col-xl-8 col-lg-10 col-md-10 mx-auto text-center">
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
                            <Input
                              placeholder="Email"
                              className="form-control"
                            />
                          </Form.Item>
                        </div>
                        {mailSent ? (
                          <button className="btn btn-green btn-lg mt-4" >
                            Link Sent
                            
                          </button>
                        ) : (
                          <button
                            className="btn btn-blue btn-lg mt-4"
                            type="submit"
                          >
                            Send Link
                            {loading && (
                              <span className="pl-4">
                                <Spin />
                              </span>
                            )}
                          </button>
                        )}

                        <p className="text-grey mt-5">
                          Didn't receive the Otp?
                          <span
                            className="click ml-2 text-blue"
                            onClick={resetPasswordRequest}
                          >
                            Resend it
                          </span>
                        </p>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="mt-auto mb-5">
                <div className="text-right">
                    <button className="btn btn-blue btn-lg" onClick={goToNext} disabled={!mailSent}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NeedHelp />
    </div>
  );
};

export default connect(null, {setAlert, handleGeneralErrors})(EnterMail);
