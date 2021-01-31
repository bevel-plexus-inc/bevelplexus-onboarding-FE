import React from 'react'
import failed from '../../assets/img/fail.png';

const ErrorModal = (props) => {
    const message = props.message
    console.log(message)
    return (
        <div className="need-help-modal responseModal">
            <div
                className="modal fade"
                id="errorModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="errorModalLabel"
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
                        <div className="modal-body text-center ">
                            <div className="mb-3">
                                <img src={failed} alt="" />
                            </div>
                            <p className="font22 mb-1">An Error Occurred</p>
                            <p className="text-grey">{message}</p>
                            <button
                                className="btn btn-upload mb-5" data-dismiss="modal"
                            >
                                Close
                  </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default (ErrorModal);

