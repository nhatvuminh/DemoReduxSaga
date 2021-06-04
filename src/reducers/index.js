import {combineReducers} from 'redux';
import footballers from './footballers';

const reducers = combineReducers({
  footballers: footballers,
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
