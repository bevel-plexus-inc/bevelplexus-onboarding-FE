import React, {useState} from 'react';
import NeedHelp from '../component/needHelp';
import SecondSidebar from '../component/second-sidebar';
import {handleGeneralErrors} from '../../globalComponent/HandleGeneralErrors';
import {Form, Input, Spin} from 'antd';
import {connect} from 'react-redux';
import {useMutation} from '@apollo/client';
import {AddRegularAccountDetails} from '../../services/auth';
import {countryISO3} from '../../services/country';
import { Link } from 'react-router-dom';

const RegisterStepThreeReg = ({handleGeneralErrors, history}) => {

  const userDetails = JSON.parse(localStorage.getItem('user'));
  const userId = userDetails?.id;
  const [countryIso3Code, setCountryIso3Code] = useState('');
  const [formData, setFormData] = useState({});
  const selectChange = (e) => {
    const val = e.target.value;
    const result = countryISO3.find((each) => each.Name === val);
    result && setCountryIso3Code(result.Code)
    
  };
  const [register, {loading}] = useMutation(AddRegularAccountDetails, {
    update(proxy, result) {
      if (result.data.addRegularAccountDetails) {
        localStorage.setItem(
          'regularDetail',
          JSON.stringify(result.data.addRegularAccountDetails)
        );
        history.push('/register-step-four-regular');
      }
    },
    onError(err) {
      handleGeneralErrors(err);
    },
    variables: formData,
  });

  const onFinish = (values) => {
    const data = {
      ...values,
      userId: userId,
      countryIso3Code: countryIso3Code,
    };
    setFormData(data);
    register();
  };


  return (
    <div className="register-wrapper one">
      <SecondSidebar sideProgress={'three'} sideLink={'regular'} />
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
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div className="title-space row">
                <div className="col-lg-7 col-md-8">
                  <p className="font22 font-bold mb-2">
                    Complete with your Address details
                  </p>
                  <p className="text-grey">
                    We take all necessary precautions to keep your Personal
                    Information protected.
                  </p>
                </div>
              </div>
              <div className="my-5">
                <div className="row">
                  <div className="col-xl-10 col-lg-12">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="ps:world"
                              data-inline="false"
                            ></span>
                          </span>
                          <Form.Item
                            name="country"
                            rules={[
                              {
                                required: true,
                                message: 'Required!',
                              },
                            ]}
                          >
                            <select
                              className="form-control"
                              onChange={(e) => selectChange(e)}
                            >
                              <option value="">Country</option>
                              {countryISO3.map((each) => {
                                return (
                                  <option key={each.Code} value={each.Name}>
                                    {each.Name}
                                  </option>
                                );
                              })}
                            </select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="mdi:city-variant-outline"
                              data-inline="false"
                            ></span>
                          </span>
                          <Form.Item
                            name="city"
                            rules={[
                              {
                                required: true,
                                message: 'Required!',
                              },
                            ]}
                          >
                            <Input
                              className="form-control"
                              placeholder="City"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="cil:location-pin"
                              data-inline="false"
                            ></span>
                          </span>
                          <Form.Item
                            name="address"
                            rules={[
                              {
                                required: true,
                                message: 'Required!',
                              },
                            ]}
                          >
                            <Input
                              className="form-control"
                              placeholder="Address"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="cil:location-pin"
                              data-inline="false"
                            ></span>
                          </span>

                          <Form.Item
                            name="postalCode"
                            rules={[
                              {
                                required: true,
                                message: 'Required!',
                              },
                            ]}
                          >
                            <Input
                              className="form-control"
                              placeholder="Postal Code"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-space">
                <div className="d-flex flex-wrap align-items-end justify-content-end">
                  
                  <button className="btn btn-blue btn-lg" type="submit" disabled={loading}>
                    Next
                    {loading && (
                      <span className="ml-4">
                        <Spin />
                      </span>
                    )}
                  </button>
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

export default connect(null, {handleGeneralErrors})(RegisterStepThreeReg);
