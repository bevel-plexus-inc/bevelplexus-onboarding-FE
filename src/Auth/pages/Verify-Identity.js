import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

 const VerifyIdentity = () => {
 
  return (
      <div>
        <div id="vouched-element" style={{height : "100%"}}></div>
      </div>    
  );
};

export default connect(null, {})(VerifyIdentity);
