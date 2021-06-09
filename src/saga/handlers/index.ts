import { call, put } from 'redux-saga/effects';
import { API_FOOTBALLERS } from '../../api';
import {
  getFootballersAPI,
  fetchProfileData,
  Footballer,
} from '../request/getFootballers';

// worker Saga: will be fired on FOOTBALLERS_FETCH_REQUESTED actions

type Response = {
  response: Footballer;
};

export function* fetchFootballers() {
  try {
    const dataResponse: Response = yield call(getFootballersAPI);
    const { response } = dataResponse;
    console.log('response', JSON.stringify(response));
    yield put({ type: 'FOOTBALLERS_FETCH_SUCCEEDED', footballers: response });
  } catch (e) {
    yield put({ type: 'FOOTBALLERS_FETCH_FAILED', message: e.message });
  }
}
