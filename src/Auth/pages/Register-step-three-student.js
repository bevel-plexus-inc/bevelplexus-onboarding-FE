import React, { useEffect, useState } from "react";
import SecondSidebar from "../component/second-sidebar";
import NeedHelp from "../component/needHelp";
import { connect } from "react-redux";
import { Form, Input, Spin, DatePicker, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { handleGeneralErrors } from "../../globalComponent/HandleGeneralErrors";
import {
  AddStudentAccountDetails,
  GetCountries,
  getInstitutionByCountry,
} from "../../services/auth";

const RegisterStepThree = ({ handleGeneralErrors, history }) => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const [formData, setFormData] = useState({});
  const [institution, setInstitution] = useState([]);

  const { data, error } = useQuery(GetCountries, {
    context: { uri: "https://bp-transaction.herokuapp.com/graphql/" },
    onError(err) {
      handleGeneralErrors(err);
    },
  });

  const getSchoolByCountry = useQuery(getInstitutionByCountry, {
    onCompleted() {
      console.log("institution again");
      console.log(getSchoolByCountry.data);
      setInstitution(getSchoolByCountry.data.getInstitutionByCountry);
    },
    variables: {
      countryId: "null",
    },
    context: { uri: "https://bp-transaction.herokuapp.com/graphql/" },
  });

  const selectChange = async (e) => {
    const val = e.target.value;
    console.log(val);
    const res = await getSchoolByCountry.fetchMore({
      variables: {
        countryId: val,
      },
      updateQuery() {},
    });
    console.log(res.data);
    setInstitution(res.data.getInstitutionByCountry);
  };

  const [register, { loading }] = useMutation(AddStudentAccountDetails, {
    update(proxy, result) {
      if (result.data.addStudentAccountDetails) {
        localStorage.setItem(
          "studentDetail",
          JSON.stringify(result.data.addStudentAccountDetails)
        );
        history.push("/register-step-four");
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
    };
    console.log(data);
    setFormData(data);
    register();
  };

  return (
    <div className="register-wrapper one">
      <SecondSidebar sideProgress={"three"} />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help?{" "}
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
                  <p className="font22 font-bold mb-2">School Information</p>
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
                              data-icon="ant-design:field-number-outlined"
                              data-inline="false"
                            ></span>
                          </span>

                          <Form.Item
                            name="studentNumber"
                            rules={[
                              {
                                required: true,
                                message: "Required!",
                              },
                            ]}
                          >
                            <Input
                              type="number"
                              className="form-control"
                              placeholder="Student Number"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="ion:mail-outline"
                              data-inline="false"
                            ></span>
                          </span>

                          <Form.Item
                            name="studentEmail"
                            rules={[
                              {
                                type: "email",
                                message: "Please Enter a valid Email!",
                              },
                              {
                                required: true,
                                message: "Required!",
                              },
                            ]}
                          >
                            <Input
                              className="form-control"
                              placeholder="Student Email"
                            />
                          </Form.Item>
                        </div>
                      </div>
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
                            name="countryId"
                            rules={[
                              {
                                required: true,
                                message: "Required!",
                              },
                            ]}
                          >
                            <select
                              className="form-control"
                              onChange={(e) => selectChange(e)}
                            >
                              <option value="">Country</option>

                              {data?.getAllCountry.map((each) => {
                                return (
                                  <option key={each.id} value={each.id}>
                                    {each.name}
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
                              data-icon="cil:school"
                              data-inline="false"
                            ></span>
                          </span>
                          <Form.Item
                            name="institutionId"
                            rules={[
                              {
                                required: true,
                                message: "Required!",
                              },
                            ]}
                          >
                            <select
                              className="form-control"
                              onChange={(e) => selectChange(e)}
                            >
                              <option value="">Select Institution</option>
                              {institution?.map((each) => {
                                return (
                                  <option key={each.id} value={each.id}>
                                    {each.name}
                                  </option>
                                );
                              })}
                            </select>
                          </Form.Item>
                          <div className="info-icon ml-2">
                            <span
                              className="iconify"
                              data-icon="bi:info-circle"
                              data-inline="false"
                            ></span>
                          </div>
                          <div className="detail">
                            <div className="d-flex">
                              <div className="mr-2">
                                <span
                                  className="iconify"
                                  data-icon="bi:info-circle"
                                  data-inline="false"
                                ></span>
                              </div>
                              <div>
                                Providing us your school information makes it
                                easy for you to make recurring payments to your
                                school with 1 click. We go the extra length to
                                keep all your data private and protected to
                                avoid stories (privacy policy)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="cil:school"
                              data-inline="false"
                            ></span>
                          </span>

                          <Form.Item
                            name="yearOfGraduation"
                            rules={[
                              {
                                required: true,
                                message: "Required!",
                              },
                            ]}
                          >
                            <DatePicker
                              className="form-control"
                              placeholder=" Expected year of graduation"
                              picker="month"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="cil:school"
                              data-inline="false"
                            ></span>
                          </span>

                          <Form.Item
                            name="course"
                            rules={[
                              {
                                required: true,
                                message: "Required!",
                              },
                            ]}
                          >
                            <Input
                              className="form-control"
                              placeholder="Course Studying"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <span className="input-icon">
                            <span
                              className="iconify"
                              data-icon="ic:outline-date-range"
                              data-inline="false"
                            ></span>
                          </span>

                          <Form.Item
                            name="dateOfBirth"
                            rules={[
                              {
                                required: true,
                                message: "Required!",
                              },
                            ]}
                          >
                            <DatePicker
                              className="form-control"
                              placeholder="Date of Birth"
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
                  <button
                    className="btn btn-blue btn-lg"
                    type="submit"
                    disabled={loading}
                  >
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

export default connect(null, { handleGeneralErrors })(RegisterStepThree);
