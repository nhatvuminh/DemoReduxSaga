import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {fetchFootballers} from './handlers';

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* fetchFootballersSaga() {
  yield takeLatest('FOOTBALLERS_FETCH_REQUESTED', fetchFootballers);
}

function* rootSaga(): Generator {
  return yield all([fetchFootballersSaga()]);
}

export default rootSaga;
