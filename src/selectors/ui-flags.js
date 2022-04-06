import {
  createSelector
} from 'reselect';

export const selectCreatedRole = state => state.createdRole;
export const selectFormError = state => state.formError;
export const selectUi = state => state.ui;
export const selectUserProfile = state => state.userProfile;
export const selectError = state => state.error;
export const selectSuccess = state => state.success;

export const selectLoading = createSelector(
  selectUi,
  ui => ui.loading
);
export const selectPageName = createSelector(
  selectUi,
  ui => ui.page
);

export const selectUserName = createSelector(
  selectUserProfile,
  profile => profile.username
);

export const selectBusinessAreaCode = createSelector(
  selectUi,
  ui => ui.businessArea
);

export const selectMenuBarPage = createSelector(
  [selectUi],
  ui => ui.menuBarPage
);
