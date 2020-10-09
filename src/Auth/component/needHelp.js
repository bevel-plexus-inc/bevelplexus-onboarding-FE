import React from 'react';

const NeedHelp = () => {
  return (
    <div className="need-help-modal">
      <div
        class="modal fade"
        id="helpModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="helpModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="px-3 py-2 text-right">
              
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
                <p className="font22">How Can We Help?</p>
                <p className="text-grey">We typically respond as soon as possible</p>
                <textarea rows="4" placeholder='Message Us' className='form-control mb-4'></textarea>
                <button
                type="button"
                class="btn btn-blue btn-md"
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
