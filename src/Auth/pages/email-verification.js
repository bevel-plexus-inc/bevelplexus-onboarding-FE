import { useMutation } from "@apollo/client";
import React from "react";
import { setAlert } from "../../services/Redux/Actions/Alert";
import { connect } from "react-redux";
import { handleGeneralErrors } from "../../globalComponent/HandleGeneralErrors";
import { VERIFY_MAIL } from "../../services/auth";
import { useEffect } from "react";

const EmailVerification = ({
  match,
  setAlert,
  handleGeneralErrors,
  history,
}) => {
  const code = match.params.code;
  const email = match.params.email;
  const [emailVerification, { loadingg }] = useMutation(VERIFY_MAIL, {
    update(proxy, result) {
      history.push({ pathname: `/success` });
    },
    onError(err) {
      console.log(err);
      history.push({ pathname: `/show-mail` });
      handleGeneralErrors(err);
    },
  });
  useEffect(() => {
    emailVerification({ variables: { email: email, token: code } });
  }, []);
  return <div></div>;
};

export default connect(null, { setAlert, handleGeneralErrors })(
  EmailVerification
);
