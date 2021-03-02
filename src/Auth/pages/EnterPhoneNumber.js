import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import {Sidebar} from '../component/sidebar';
import NeedHelp from '../component/needHelp';
import {REQUEST_RESET_PASSWORD} from '../../services/auth';
import {useMutation} from '@apollo/client';
import {setAlert} from '../../services/Redux/Actions/Alert';
import {connect} from 'react-redux';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {Spin} from 'antd';
import PhoneInput from 'react-phone-number-input';

const EnterPhoneNumber = ({setAlert, handleGeneralErrors, history}) => {

  const [prefix, setPrefix] = useState('');
  const [numb, setNumb] = useState('');
  const [formData, setFormData] = useState({
    phoneNumber: `${prefix}${numb}`,
  });

  const {phoneNumber} = formData;
 
  const onNumberChange = (e) => {
    setFormData({
      phoneNumber: `${e}`,
    });
  };

  const [resetPasswordRequest, {loading}] = useMutation(
    REQUEST_RESET_PASSWORD,
    {
      update(proxy, result) {
        if (result.data.resetPasswordRequest.message) {
          setAlert(result.data.resetPasswordRequest.message);
          history.push({pathname: '/verify-code', state: {formData}});
        }
      },
      onError(err) {
        console.log(err);
        handleGeneralErrors(err);
      },
    }
  );

  const submitForm = (e) => {
    e.preventDefault();
    if (formData.phoneNumber === '') {
      setAlert('Please Enter your Phone Number', 'error');
    } else {
      resetPasswordRequest({variables: formData});
    }
  };
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
                    <p className="font22 font-bold mb-2">Enter Phone Number</p>
                    <p className="text-grey">
                      Input your phone number. We'll send you a reset code to
                      you.
                    </p>
                  </div>
                </div>
                <div className="my-5">
                  <form>
                    <div className="row">
                      <div className="col-xl-8 col-lg-10 col-md-10 mx-auto text-center">
                        <div className="form-group mr-3">
                          <PhoneInput
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={onNumberChange}
                          />
                        </div>

                        <button
                          className="btn btn-blue btn-lg mt-4"
                          onClick={(e) => submitForm(e)}
                        >
                          Send Code
                          {loading && (
                            <span className="ml-4">
                              <Spin />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
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

export default connect(null, {setAlert, handleGeneralErrors})(EnterPhoneNumber);
