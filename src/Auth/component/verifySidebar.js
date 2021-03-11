import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/img/logo-white.svg';
import '../../styles/sidebar.scss';

export const VerifySidebar = () => {
  const [isOpen, setisOpen] = useState(false);
  const sidebarToggle = () => {
    setisOpen(!isOpen);
  };
  const login = () => {
    window.location.href = 'https://app.bevelplexus.com/payment/dashboard'
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
          <div className="sidebar-wrapper">
            <div className="d-flex align-items-center">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="pt-space text-white">
              <h3 className="font38 font-bold mb-4">
                A few clicks away to safely transfer money.
              </h3>
              <p className="font-md light-white">
                Create your accounts in minutes and <br /> send money safely.
              </p>
              <div className="logout d-flex align-items-center pt-space verify-continue-later" onClick={login}>
                <span className="mr-2">
                  <span
                    className="iconify"
                    data-icon="codicon:debug-reverse-continue"
                    data-inline="false"
                  ></span>
                </span>
                <span className="mt-1">Continue Later</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
