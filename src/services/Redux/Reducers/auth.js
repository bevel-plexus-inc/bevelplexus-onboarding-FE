import {LOGOUT, AUTH_ERROR, LOGIN_FAIL, REGISTER_FAIL} from '../Actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')),
  isAuthenticated: null,
  loading: true,
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (action.type) {
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
