import React, {useState} from 'react';
import logo from '../../assets/img/logo-white.svg';
import checkmark from '../../assets/img/check.png';
import '../../styles/sidebar.scss';
import {Link} from 'react-router-dom';

export const SecondSidebar = ({sideProgress}) => {
  const [isOpen, setisOpen] = useState(false);
  const sidebarToggle = () => {
    setisOpen(!isOpen);
  };
  console.log(sideProgress);
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
          <div className="sidebar-wrapper">
            <div className="d-flex align-items-center">
              <div className="mr-3 text-white font24">
                <span
                  className="iconify"
                  data-icon="dashicons:arrow-left-alt"
                  data-inline="false"
                ></span>
              </div>
              <img src={logo} alt="" />
            </div>
            <div className="mt-5 text-white">
              <div className="side-links">
                <a href=''>
                  <img src={checkmark} alt="" className="check-mark" />
                  Personal info
                </a>
                <Link
                  to="/register-step-two"
                  className={sideProgress === 'two' ? 'active' : ''}
                >
                  {sideProgress === 'three' ? (
                    <img src={checkmark} alt="" className="check-mark" />
                  ) : sideProgress === 'four' ? (
                    <img src={checkmark} alt="" className="check-mark" />
                  ) : sideProgress === 'five' ? (
                    <img src={checkmark} alt="" className="check-mark" />
                  ) : (
                    <span className="number">2</span>
                  )}
                  Phone Verification
                </Link>
                <Link
                  to="/register-step-three"
                  className={sideProgress === 'three' ? 'active' : ''}
                >
                  {sideProgress === 'four' ? (
                    <img src={checkmark} alt="" className="check-mark" />
                  ) : sideProgress === 'five' ? (
                    <img src={checkmark} alt="" className="check-mark" />
                  ) : (
                    <span className="number">3</span>
                  )}
                  School information
                </Link>
                <Link
                  to="/register-step-five"
                  className={sideProgress === 'five' ? 'active' : ''}
                >
                  <span className="number">4</span>
                  Documents
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
