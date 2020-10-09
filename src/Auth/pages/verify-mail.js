import React from 'react';
import {Sidebar} from '../component/sidebar';
import mailBox from '../../assets/img/mailBox.svg';
import {Link} from 'react-router-dom';
import NeedHelp from '../component/needHelp';

const ShowMail = () => {
  return (
    <div className="register-wrapper one">
      <Sidebar />
      <section className="main-auth-content">
        <div>
          <div className="need-help text-grey font14 m-4">
            Need help? <span className="text-blue click ml-2" data-toggle="modal" data-target="#helpModal">Click here</span>
          </div>
          <div className="px d-body">
            <div>
              <div className="title-space">
                <p className="font22 font-bold mb-2">You’ve got Mail!</p>
                <p className="text-grey">
                  We have sent a verification email to s*********@gmail.com{' '}
                  <br />
                  Please click the link sent to your email to continue
                </p>
              </div>
              <div className="pt-5 row">
                <div className="col-lg-6 col-md-7 col-sm-12 mx-auto">
                  <img src={mailBox} alt="" className="w-100" />
                  <div className="agreement-check text-grey mt-5">
                    Didn't receive the email?
                    <span className="text-blue click ml-2">Resend Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-auto pb-4">
            <Link to="/register-step-two" className=" text-grey click ml-2 mt-auto">
              <button className="btn btn-grey btn-lg">Next</button>
            </Link>
          </div>
        </div>
      </section>
      <NeedHelp/>
    </div>
  );
};

export default ShowMail;
