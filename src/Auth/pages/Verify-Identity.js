import React from 'react';
import {connect} from 'react-redux';
import {Sidebar} from '../component/sidebar';

const VerifyIdentity = () => {
 
  return (
    <>
      <body className="register-wrapper">
        <Sidebar />
        <section className="main-auth-content">
          <div id="vouched-element" style={{height: '100vh'}}></div>
        </section>
      </body>
    </>
  );
};

export default connect(null, {})(VerifyIdentity);
