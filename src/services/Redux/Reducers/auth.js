import {LOGOUT} from '../Actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')),
  isAuthenticated: null,
  loading: true,
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (action.type) {
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tempEnrollmentVerified')
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
