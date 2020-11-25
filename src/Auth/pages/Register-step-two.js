import {Spin} from 'antd';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import NeedHelp from '../component/needHelp';
import {SecondSidebar} from '../component/second-sidebar';
import {connect} from 'react-redux';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {useMutation} from '@apollo/client';
import {AUTHENTICATE_PHONE_NUMBER} from '../../services/auth';
import {setAlert} from '../../services/Redux/Actions/Alert';
import {countryCodes} from '../../services/country';
import PhoneInput from 'react-phone-number-input';

const RegisterStepTwo = ({handleGeneralErrors, setAlert}) => {
  const history = useHistory();
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const [prefix, setPrefix] = useState('');
  const [numb, setNumb] = useState('');
  const [formData, setFormData] = useState({
    phoneNumber: '',
    userId: userId,
  });
  const {phoneNumber} = formData;
  const onPrefixChange = (e) => {
    setPrefix(e.target.value);
    setFormData({
      phoneNumber: `${e.target.value}${numb}`,
      userId: userId,
    });
  };
  const onNumberChange = (e) => {
    console.log(e);
    // setNumb(e.target.value);
    // setFormData({
    //   phoneNumber: `${prefix}${e.target.value}`,
    //   userId: userId,
    // });
  };

  const [authenticatePhoneNumber, {loading}] = useMutation(
    AUTHENTICATE_PHONE_NUMBER,
    {
      update(proxy, result) {
        console.log(result);
        if (result.data.authenticatePhoneNumber) {
          setAlert(result.data.authenticatePhoneNumber.message);
          history.push({pathname: '/register-verify-code', state: {formData}});
        }
      },
      onError(err) {
        handleGeneralErrors(err);
      },
      variables: formData,
    }
  );

  const submitForm = (e) => {
    e.preventDefault();
    if (prefix === '') {
      setAlert('Please select your country code', 'error');
      return;
    } else if (numb === '') {
      setAlert('Please Enter your Phone Number', 'error');
    } else {
      console.log(formData);
      authenticatePhoneNumber();
    }
  };
  return (
    <div className="register-wrapper">
      <SecondSidebar sideProgress={'two'} />
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
                    <p className="font22 font-bold mb-2">Verify your Number</p>
                    <p className="text-grey">
                      Add your phone number. We'll send you a verification code
                      so we know you're real.
                    </p>
                  </div>
                </div>
                <div className="my-5">
                  <form>
                    <div className="row">
                      <div className="col-xl-8 col-lg-10 col-md-10 mx-auto text-center">
                        <div className="form-group mr-3">
                          <div className="phone-input-icon">
                            <span
                              className="iconify"
                              data-icon="bi:phone"
                              data-inline="false"
                            ></span>
                          </div>
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
                                    <option key={each.name} value={each.code}>
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
                          </div>
                         */}
                        </div>

                        <button
                          className="btn btn-blue btn-lg mt-4"
                          onClick={(e) => submitForm(e)}
                          disabled={loading}
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
                <div className="text-right">
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

export default connect(null, {handleGeneralErrors, setAlert})(RegisterStepTwo);
