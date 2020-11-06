import {combineReducers} from 'redux';
import alert from './Alert';
import auth from './auth'

const rootReducers = combineReducers({
  alert,
  auth
});
export default rootReducers;
