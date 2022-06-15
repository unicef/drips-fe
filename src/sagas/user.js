import {
  takeLatest,
  call,
  put
} from 'redux-saga/effects';
import {
  getUserProfile,
} from 'api';
import {
  onFetchUserProfile,
  redirectToLogin,
} from 'actions';
import {
  setLoading
} from 'slices/ui';
import {
  onReceiveUserProfile
} from 'slices/user-profile';

function* handleFetchUserProfile() {
  yield put(setLoading(true));
  try {
    const users = yield call(getUserProfile);
    const userProfile = users && users.length ? users[0] : {};
    yield put(onReceiveUserProfile(userProfile));
  } catch (err) {
    yield put(redirectToLogin());
  } finally {
    yield put(setLoading(false));
  }
}

export default function*() {
  yield takeLatest(onFetchUserProfile.type, handleFetchUserProfile);
}
