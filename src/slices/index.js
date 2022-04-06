import {combineReducers} from 'redux';
import {collectionsReducers} from './collections';
import {businessAreaReducer} from './business-area';
import {uiReducer} from './ui';
import {userProfileReducer} from './user-profile';
import {successReducer} from './success';
import {errorReducer} from './error';

export default combineReducers({
  businessArea: businessAreaReducer,
  userProfile: userProfileReducer,
  ui: uiReducer,
  error: errorReducer,
  success: successReducer,
  ...collectionsReducers
});
