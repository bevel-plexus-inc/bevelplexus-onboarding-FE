import React, {useState} from 'react';
import logo from '../../assets/img/logo-white.svg';
import '../../styles/sidebar.scss';

export const Sidebar = () => {
  const [isOpen, setisOpen] = useState(false);
  const sidebarToggle = () => {
    setisOpen(!isOpen);
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
              <h3 className="font38 font-bold mb-4">
                A few clicks away to safely transfer money.
              </h3>
              <p className="font-md light-white">
                Create your accounts in minutes and <br /> send money safely.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
