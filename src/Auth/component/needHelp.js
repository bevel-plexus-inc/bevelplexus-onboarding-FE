import React from 'react';

const NeedHelp = () => {
  return (
    <div className="need-help-modal">
      <div
        className="modal fade"
        id="helpModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="helpModalLabel"
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
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
                <p className="font22">How Can We Help?</p>
                <p className="text-grey">We typically respond as soon as possible</p>
                <textarea rows="4" placeholder='Message Us' className='form-control mb-4'></textarea>
                <button
                type="button"
                className="btn btn-blue btn-md"
              >
                Send
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedHelp;
