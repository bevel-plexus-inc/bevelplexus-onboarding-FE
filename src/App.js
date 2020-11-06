import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import Register from './Auth/pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import EnterPhoneNumber from './Auth/pages/EnterPhoneNumber';
import 'antd/dist/antd.css';
import VerifyCode from './Auth/pages/verify-code';
import RegisterStepThree from './Auth/pages/Register-step-three-student';
import RegisterStepThreeReg from './Auth/pages/Register-step-three-regular';
import RegisterStepFourStud from './Auth/pages/Register-step-four';
import Login from './Auth/pages/login';
import ShowMail from './Auth/pages/verify-mail';
import ForgotPassword from './Auth/pages/forgot-password';
import ResetPassword from './Auth/pages/reset-password';
import EnterMail from './Auth/pages/EnterMail';
import RegisterStepFourRegular from './Auth/pages/Register-step-four-regular';
import RegisterStepTwo from './Auth/pages/Register-step-two';
import RegisterVerifyCode from './Auth/pages/Register-verify-cod';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

//Redux
import {Provider} from 'react-redux';
import store from './services/Redux/store';
import GlobalAlert from './globalComponent/GlobalAlert';

// Initialize apollo and set authorization token
const httpLink = createHttpLink({
  uri: 'http://3.84.143.48:5000/graphql',
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'same-origin',
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </>
  );
}

const Main = withRouter(({location}) => {
  return (
    <>
      <GlobalAlert />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/show-mail" component={ShowMail} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/enter-number" component={EnterPhoneNumber} />
        <Route exact path="/enter-mail" component={EnterMail} />
        <Route exact path="/reset-password/:id" component={ResetPassword} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register-step-two" component={RegisterStepTwo} />
        <Route
          exact
          path="/register-step-three"
          component={RegisterStepThree}
        />
        <Route
          exact
          path="/register-step-three-regular"
          component={RegisterStepThreeReg}
        />
        <Route
          exact
          path="/register-step-four"
          component={RegisterStepFourStud}
        />
        <Route
          exact
          path="/register-step-four-regular"
          component={RegisterStepFourRegular}
        />
        <Route
          exact
          path="/register-verify-code"
          component={RegisterVerifyCode}
        />
        <Route exact path="/verify-code" component={VerifyCode} />
      </Switch>
    </>
  );
});

export default App;
