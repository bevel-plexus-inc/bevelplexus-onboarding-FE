import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import Register from './Auth/pages/Register';
import RegisterTwo from './Auth/pages/Register-two';
import RegisterThree from './Auth/pages/Register-three';
import RegisterStepTwo from './Auth/pages/Register-step-two';
import RegisterVerifyCode from './Auth/pages/register-verify-code';
import RegisterStepThree from './Auth/pages/Register-step-three';
import RegisterStepFour from './Auth/pages/Register-step-four';
import RegisterStepFive from './Auth/pages/Register-step-five';

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
        <Route exact path="/" component={Register} />
        <Route exact path="/register-two" component={RegisterTwo} />
        <Route exact path="/register-three" component={RegisterThree} />
        <Route exact path="/register-step-two" component={RegisterStepTwo} />
        <Route
          exact
          path="/register-step-three"
          component={RegisterStepThree}
        />
        <Route exact path="/register-step-four" component={RegisterStepFour} />
        <Route exact path="/register-step-five" component={RegisterStepFive} />
        <Route exact path="/verify-code" component={RegisterVerifyCode} />
      </Switch>
    </>
  );
});

export default App;
