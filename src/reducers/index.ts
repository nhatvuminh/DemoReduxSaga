import {combineReducers} from 'redux';
import footballers from './footballers';

const reducers = combineReducers({
  footballers: footballers,
});

const rootReducer = (state: any, action: any) => reducers(state, action);

export default rootReducer;
