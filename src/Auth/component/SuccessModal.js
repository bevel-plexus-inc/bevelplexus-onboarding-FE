import React from 'react';
import {connect} from 'react-redux';
import passed from '../../assets/img/pass.png';

const SuccessModal = () => {
  const CloseModal = () => {
    localStorage.removeItem('VerifyIdentity');
  };
  return (
    <div className="need-help-modal responseModal">
      <div
        className="modal fade"
        id="successModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="successModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="px-3 py-2 text-right">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={CloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center ">
              <div className="mb-3">
                <img src={passed} alt="" />
              </div>
              <p className="font22 mb-1">Verification Successful</p>
              <p className="text-grey">Thankyou</p>
              <button className="btn btn-upload mb-5" data-dismiss="modal" onClick={CloseModal}>Proceed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {})(SuccessModal);
