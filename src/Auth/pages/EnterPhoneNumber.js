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
  const userId = JSON.parse(localStorage.getItem('user')).id;
  if(userId === null){
    setAlert('Please you need to register first')
  }
  const [prefix, setPrefix] = useState('');
  const [numb, setNumb] = useState('');
  const [formData, setFormData] = useState({
    phoneNumber: `${prefix}${numb}`,
    userId: userId,
  });
 
  const {phoneNumber} = formData;
  // const onPrefixChange = (e) => {
  //   setPrefix(e.target.value);
  //   setFormData({
  //     phoneNumber: `${e.target.value}${numb}`,
  //     userId: userId,
  //   });
  // };
  const onNumberChange = (e) => {
    setFormData({
      phoneNumber: `${e}`,
      userId: userId,
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
                          {/* <div className="phone-input-wrapper">
                            <div className="prefix-number">
                              <span className="input-icon">
                                <span
                                  className="iconify"
                                  data-icon="ps:world"
                                  data-inline="false"
                                ></span>
                              </span>
                              <select
                                className="form-control"
                                name="prefix"
                                value={prefix}
                                onChange={(e) => onPrefixChange(e)}
                              >
                                <option value="+234">+234</option>
                              {countryCodes.map((each) => {
                                return (
                                  <option
                                    key={each.name}
                                    value={each.code}
                                  >
                                    {each.code}
                                  </option>
                                );
                              })}
                              </select>
                            </div>
                            <div className="full-number">
                              <div className="input-icon">
                                <span
                                  className="iconify"
                                  data-icon="bi:phone"
                                  data-inline="false"
                                ></span>
                              </div>
                              <input
                                type="number"
                                className="form-control"
                                name="numb"
                                value={numb}
                                onChange={(e) => onNumberChange(e)}
                              />
                            </div>
                          </div> */}
                          
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
              <div className="mt-auto mb-5">
                <div className="d-flex flex-wrap align-items-center justify-content-between font-bold text-grey agreement-check">
                  <div>PREVIOUS</div>
                  <div className="mr-2">SKIP FOR NOW</div>
                    <button className="btn btn-grey btn-lg">Next</button>
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
