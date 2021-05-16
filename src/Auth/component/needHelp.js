import React, { useState } from "react";
import { Form, Input, Spin } from "antd";
import { RequestHelp } from "../../services/auth";
import { useMutation } from "@apollo/client";
import { setAlert } from "../../services/Redux/Actions/Alert";
import { connect } from "react-redux";
import { handleGeneralErrors } from "../../globalComponent/HandleGeneralErrors";

const NeedHelp = ({ setAlert, handleGeneralErrors }) => {
  const [formData, setFormData] = useState();
  const [form] = Form.useForm();
  const [postMessage, { loading }] = useMutation(RequestHelp, {
    update(proxy, result) {
      setAlert("Message Sent");
      document.querySelector(".close").click();
      form.resetFields();
      setFormData();
    },
    onError(err) {
      handleGeneralErrors(err);
    },
    variables: formData,
  });

  const onFinish = (values) => {
    setFormData(values);
    postMessage();
  };

  return (
    <div className="need-help-modal">
      <div
        className="modal fade"
        id="helpModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="helpModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="px-3 py-2 text-right">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <p className="font22">How Can We Help?</p>
              <p className="text-grey">
                Fill in your details and enquiry below. We will respond to you
                within 24 hours
              </p>
              <Form
                form={form}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="name"
                  className="mb-2"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name!",
                    },
                  ]}
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="form-control"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  className="mb-2"
                  rules={[
                    {
                      type: "email",
                      message: "This is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please enter your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email Address" className="form-control" />
                </Form.Item>
                <Form.Item
                  name="message"
                  className="mb-4"
                  rules={[
                    {
                      required: true,
                      message: "Please type in your message",
                    },
                  ]}
                >
                  <textarea
                    rows="4"
                    placeholder="Message Us"
                    className="form-control"
                  ></textarea>
                </Form.Item>
                <button
                  type="submit"
                  className="btn btn-blue btn-md"
                  disabled={loading}
                >
                  Send
                  {loading && (
                    <span className="ml-4">
                      <Spin />
                    </span>
                  )}
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setAlert, handleGeneralErrors })(NeedHelp);
