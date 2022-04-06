import {
  propOr,
  prop
} from 'ramda';
import {
  createSelector
} from 'reselect';

export const selectCreatedRole = state => state.createdRole;
export const selectFormError = state => state.formError;
export const selectUi = state => state.ui;
export const selectUserProfile = state => state.userProfile;
export const selectError = state => state.error;
export const selectSuccess = state => state.success;
export const selectUserDonor = state => state.donor;

export const selectCurrentlyLoadedDonor = createSelector(
  selectUi,
  ui => ui.currentlyLoadedDonor
);

export const selectLoading = createSelector(
  selectUi,
  ui => ui.loading
);
export const selectPageName = createSelector(
  selectUi,
  ui => ui.page
);

//@dci
export const selectUserGroup = createSelector(
  selectUserProfile,
  profile => profile.group.name
);

export const selectIsSuperUser = createSelector(
  selectUserProfile,
  prop('is_superuser')
);

export const selectUserProfileDonor = createSelector(
  selectUserProfile,
  propOr({}, 'donor')
);

export const selectUserName = createSelector(
  selectUserProfile,
  profile => profile.username
);

export const selectUserProfileDonorId = createSelector(
  selectUserProfileDonor,
  donor => donor.id
);

export const selectDonorName = createSelector(
  [selectUserDonor],
  propOr('', 'name')
);

export const selectDonorId = createSelector(
  [selectUi],
  propOr('', 'donorId')
);

export const selectBusinessAreaCode = createSelector(
  selectUi,
  ui => ui.businessArea
);

export const selectMenuBarPage = createSelector(
  [selectUi],
  ui => ui.menuBarPage
);
