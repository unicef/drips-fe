import {
  takeLatest,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';

import {
  getBusinessArea,
  getMetadata,
  getConfig
} from 'api';

import {
  equals
} from 'ramda';

import {
  setError
} from 'slices/error';
import {
  setBusinessArea
} from 'slices/business-area';
import {
  initBusinessAreaList
} from 'actions';
import {
  setLoading
} from 'slices/ui';
import {
  onReceiveMetadata,
  metadataInitialState
} from 'slices/metadata';
import {
  selectMetadata,
  selectConfig
} from 'selectors/collections';
import {
  configInitialState,
  onReceiveConfig
} from 'slices/config';

function* handleFetchBusinessArea() {
  try {
    yield put(setLoading(true));
    const businessArea = yield call(getBusinessArea);
    yield put(setBusinessArea(businessArea));
  } catch (err) {
    yield put(setError(err));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleFetchMetadata() {
  const metadata = yield select(selectMetadata);

  if (!equals(metadata, metadataInitialState)) {
    return;
  }

  try {
    const metadataDropdowns = yield call(getMetadata);
    yield put(onReceiveMetadata(metadataDropdowns));
  } catch (err) {
    yield put(setError(err));
  }
}

function* handleFetchConfig() {
  const config = yield select(selectConfig);

  if (!equals(config, configInitialState)) {
    return;
  }

  try {
    const configAssets = yield call(getConfig);
    yield put(onReceiveConfig(configAssets));
  } catch (err) {
    yield put(setError(err));
  }
}

export function* businessSaga() {
  yield takeLatest(initBusinessAreaList.type, handleFetchBusinessArea);
  yield all([call(handleFetchMetadata), call(handleFetchConfig)])
}

export default function*() {
  yield all([businessSaga()]);
}
