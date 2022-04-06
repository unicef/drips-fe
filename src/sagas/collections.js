import {
  takeLatest,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';

import {
  getBusinessArea,
  getStaticAssets,
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
  onReceiveStaticAssets,
  staticAssetsInitialState
} from 'slices/static';
import {
  onReceiveMetadata,
  metadataInitialState
} from 'slices/metadata';
import {
  selectStaticAssets,
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


function* handleFetchStatic() {
  const staticAssets = yield select(selectStaticAssets);

  if (!equals(staticAssets, staticAssetsInitialState)) {
    return;
  }

  try {
    const staticDropdowns = yield call(getStaticAssets);
    yield put(onReceiveStaticAssets(staticDropdowns));
  } catch (err) {
    yield put(setError(err));
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
  yield all([call(handleFetchStatic), call(handleFetchMetadata), call(handleFetchConfig)])
}

export default function*() {
  yield all([businessSaga()]);
}
