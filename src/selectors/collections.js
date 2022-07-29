import {
  createSelector
} from 'reselect';

export const selectBusinessAreas = state => state.businessArea;
export const selectStaticAssets = state => state.staticAssets;
export const selectMetadata = state => state.metadata;
export const selectReports = state => state.reports;
export const selectSearchReports = state => state.searchReports;
export const selectConfig = state => state.config;


export const selectIPType = createSelector(
  selectMetadata,
  assets => assets.ip_type
);
export const selectCostCenter = createSelector(
  selectMetadata,
  assets => assets.cost_center
);
export const selectHeadOffice = createSelector(
  selectMetadata,
  assets => assets.head_office
);
export const selectCSOType = createSelector(
  selectMetadata,
  assets => assets.cso_type
);
export const selectRiskRating = createSelector(
  selectMetadata,
  assets => assets.risk_rating
);
export const selectBapDocumentType = createSelector(
  selectMetadata,
  assets => assets.bap_document_type
);
export const selecDocumentType = createSelector(
  selectMetadata,
  assets => assets.document_type
);
export const selectFaceType = createSelector(
  selectMetadata,
  assets => assets.face_type
);
export const selectUploadingApp = createSelector(
  selectMetadata,
  assets => assets.uploading_app
);
