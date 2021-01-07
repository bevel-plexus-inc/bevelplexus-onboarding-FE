import React from 'react';
import {Link} from 'react-router-dom';
import notfound from '../../assets/img/404.png'; 
// import notfound from 'assets/img/404.png'; 

const Notfound = () => {
  return (
    <div className="notfound-wrapper">
      <div>
        <img src={notfound} alt="" />
        <div className="back-home text-center mt-4">
          <Link to="/">
            <button className='btn btn-blue'>Back to home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
