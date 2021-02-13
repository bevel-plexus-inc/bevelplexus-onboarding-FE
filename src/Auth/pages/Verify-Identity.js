import React from 'react';
import { VerifySidebar } from '../component/verifySidebar';

const VerifyIdentity = () => {


  return (
    <>
      <body className="register-wrapper">
        <VerifySidebar />
        <section className="main-auth-content">
          <div id="vouched-element" style={{height: '100vh'}}></div>
        </section>
      </body>
    </>
  );
};

export default (VerifyIdentity);
