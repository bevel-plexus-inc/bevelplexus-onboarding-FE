import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import Register from './Auth/pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import EnterPhoneNumber from './Auth/pages/EnterPhoneNumber';
import VerifyCode from './Auth/pages/verify-code';
import RegisterStepThree from './Auth/pages/Register-step-three';
import RegisterStepFour from './Auth/pages/Register-step-four';
import RegisterStepFive from './Auth/pages/Register-step-five';
import Login from './Auth/pages/login';
import ShowMail from './Auth/pages/verify-mail';
import ForgotPassword from './Auth/pages/forgot-password';
import ResetPassword from './Auth/pages/reset-password';
import EnterMail from './Auth/pages/EnterMail';
import RegisterStepFiveRegular from './Auth/pages/Register-step-five-regular';
import RegisterStepTwo from './Auth/pages/Register-step-two';
import RegisterVerifyCode from './Auth/pages/Register-verify-cod';

function App() {
  return (
    <>
      <BrowserRouter>
        <Main /> 
      </BrowserRouter>
    </>
  );
}

const Main = withRouter(({location}) => {
  return ( 
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/show-mail" component={ShowMail} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/enter-number" component={EnterPhoneNumber} />
        <Route exact path="/enter-mail" component={EnterMail} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register-step-two" component={RegisterStepTwo} />
        <Route
          exact
          path="/register-step-three"
          component={RegisterStepThree}
        />
        <Route exact path="/register-step-four" component={RegisterStepFour} />
        <Route exact path="/register-step-five" component={RegisterStepFive} />
        <Route exact path="/register-step-five-regular" component={RegisterStepFiveRegular} />
        <Route exact path="/register-verify-code" component={RegisterVerifyCode} />
        <Route exact path="/verify-code" component={VerifyCode} />
      </Switch>
    </>
  );
});

export default App;
