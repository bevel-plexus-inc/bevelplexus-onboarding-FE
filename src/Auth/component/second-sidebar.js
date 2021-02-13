import React, { useState } from 'react';
import logo from '../../assets/img/logo-white.svg';
import checkmark from '../../assets/img/check.png';
import '../../styles/sidebar.scss';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const SecondSidebar = ({ sideProgress, sideLink }) => {
  const history = useHistory();
  const [isOpen, setisOpen] = useState(false);
  const sidebarToggle = () => {
    setisOpen(!isOpen);
  };


  const login = () => {
    window.location.href = 'https://app.bevelplexus.com/dashboard'
  };

  return (
    <div>
      <div className="side-wrapper">
        <div
          className={isOpen ? 'sidebar-overlay' : ''}
          onClick={sidebarToggle}
        ></div>
        <div className="menu-icon" onClick={sidebarToggle}>
          <span
            className="iconify"
            data-icon="fe:app-menu"
            data-inline="false"
          ></span>
        </div>
        <section className={isOpen ? 'sidebar sidebar-isOpen' : 'sidebar'}>
          <div className="sidebar-wrapper side-with-flex">
            <div>
              <div className="d-flex align-items-center">
                {/* <div className="mr-3 text-white font24">
                <span
                  className="iconify"
                  data-icon="dashicons:arrow-left-alt"
                  data-inline="false"
                ></span>
              </div> */}
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="mt-5 text-white">
                <div className="side-links">
                  <div className="each-link">
                    <img src={checkmark} alt="" className="check-mark" />
                    Personal info
                  </div>
                  <div
                    className={
                      sideProgress === 'two' ? 'each-link active' : 'each-link'
                    }
                  >
                    {sideProgress === 'three' ? (
                      <img src={checkmark} alt="" className="check-mark" />
                    ) : sideProgress === 'four' ? (
                      <img src={checkmark} alt="" className="check-mark" />
                    ) : (
                          <span className="number">2</span>
                        )}
                    Phone Verification
                  </div>
                  <div
                    className={
                      sideProgress === 'three'
                        ? 'each-link active'
                        : 'each-link'
                    }
                  >
                    {sideProgress === 'four' ? (
                      <img src={checkmark} alt="" className="check-mark" />
                    ) : (
                        <span className="number">3</span>
                      )}
                    {sideLink === 'regular' ? (
                      <span>Address</span>
                    ) : (
                        <span>School information</span>
                      )}
                  </div>
                  <div
                    className={
                      sideProgress === 'four' ? 'each-link active' : 'each-link'
                    }
                  >
                    <span className="number">4</span>

                    {sideLink === 'regular' ? (
                      <span>Verification</span>
                    ) : (
                        <span>Documents</span>
                      )}
                  </div>
                </div>
              </div>
            </div>
            {sideProgress != 'two' &&
              <div className="logout d-flex align-items-center" onClick={login}>
                <span className="mr-2">
                  <span
                    className="iconify"
                    data-icon="codicon:debug-reverse-continue"
                    data-inline="false"
                  ></span>
                </span>
                <span className="mt-1">Continue Later</span>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default (SecondSidebar);
