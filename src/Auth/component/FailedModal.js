import React from 'react';
import failed from '../../assets/img/fail.png';

const FailedModal = () => {
  const CloseModal = () => {
    localStorage.removeItem('VerifyIdentity');
  };
  return (
    <div className="need-help-modal responseModal">
      <div
        className="modal fade"
        id="failedModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="failedModalLabel"
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
                <img src={failed} alt="" />
              </div>
              <p className="font22 mb-1">Verification Failed</p>
              <p className="text-grey">Please attempt to verify again</p>
              <a
                href="/verify-identity"
                onClick={CloseModal}
                className="btn btn-upload mb-5"
              >
                Verify ID
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default (FailedModal);
