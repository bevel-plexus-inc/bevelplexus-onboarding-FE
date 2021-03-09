import React, { useState } from "react";
import { Sidebar } from "../component/sidebar";
import mailBox from "../../assets/img/mailBox.svg";
import { Link } from "react-router-dom";
import NeedHelp from "../component/needHelp";

const SuccessPage = () => {
  return (
    <div className="register-wrapper one">
      <Sidebar />
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
          <div className="px d-body">
            <div>
              <div className="title-space">
                <p className="font22 font-bold mb-2">Hooray 🎉🎉</p>
                <p className="text-grey">
                  Your email verification is successful
                  <br />
                  Please click the login button below to continue
                </p>
              </div>
              <div className="pt-5 row">
                <div className="col-lg-6 col-md-7 col-sm-12 mx-auto text-center">
                  <img src={mailBox} alt="" className="w-100" />
                  <Link to="/">
                    <button className="btn btn-blue btn-lg mt-5">Login</button>
                  </Link>
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

export default SuccessPage;
