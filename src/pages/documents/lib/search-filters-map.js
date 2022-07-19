import {
  IP_TYPE_FIELD,
  CSO_TYPE_FIELD,
  OFFICE_FIELD,
  RISK_RATING_FIELD,
  BAP_DOCUMENT_TYPE_FIELD,
  DOCUMENT_TYPE_FIELD,
  FACE_TYPE_FIELD,
  UPLOADING_APP_FIELD,
  IP_NO_FIELD,
  BAP_DOCUMENT_NO_FIELD,
  FACE_NO_FIELD,
  PROGRAM_OFFICER_FIELD,
  FACE_DATE_FIELD,
  HEAD_OFFICE_FIELD,
  UPLOADED_BY_FIELD,
  FACE_DESCRIPTION_FIELD,
  SEARCH_FIELD
} from '../search-constants';

import {keys} from 'ramda';

import BapDocumentNoFilter from '../components/bap-document-no-filter';
import BapDocumentTypeFilter from '../components/bap-document-type-filter';
import CSOTypeFilter from '../components/cso-type-filter';
import DocumentTypeFilter from '../components/document-type-filter';
import {FaceDateFilter} from '../components/face-date-filter';
import FaceNoFilter from '../components/face-no-filter';
import FaceTypeFilter from '../components/face-type-filter';
import HeadOfficeFilter from '../components/head-office-filter';
import IPNoFilter from '../components/ip-no-filter';
import IPTypeFilter from '../components/ip-type-filter';
import OfficeFilter from '../components/office-filter';
import ProgramOfficerFilter from '../components/program-officer-filter';
import RiskRatingFilter from '../components/risk-rating-filter';
import UploadingAppFilter from '../components/uploading-app-filter';
import UploadedByFilter from '../components/uploaded-by-filter';
import FaceDescriptionFilter from '../components/face-description-filter';
import SearchFilter from '../components/search-filter';


export const FILTERS_MAP = {
  [SEARCH_FIELD]: {
    label: 'Search',
    Component: SearchFilter
  },
  [IP_TYPE_FIELD]: {
    label: 'IP Type',
    Component: IPTypeFilter
  },
  [CSO_TYPE_FIELD]: {
    label: 'CSO Type',
    Component: CSOTypeFilter
  },
  [OFFICE_FIELD]: {
    label: 'Office',
    Component: OfficeFilter
  },
  [RISK_RATING_FIELD]: {
    label: 'Risk Rating',
    Component: RiskRatingFilter
  },
  [IP_NO_FIELD]: {
    label: 'IP No',
    Component: IPNoFilter
  },
  [BAP_DOCUMENT_NO_FIELD]: {
    label: 'BAP Document No',
    Component: BapDocumentNoFilter
  },
  [BAP_DOCUMENT_TYPE_FIELD]: {
    label: 'BAP Document Type',
    Component: BapDocumentTypeFilter
  },
  [DOCUMENT_TYPE_FIELD]: {
    label: 'Document Type',
    Component: DocumentTypeFilter
  },
  [FACE_TYPE_FIELD]: {
    label: 'FACE Type',
    Component: FaceTypeFilter
  },
  [FACE_NO_FIELD]: {
    label: 'FACE No',
    Component: FaceNoFilter
  },
  [FACE_DESCRIPTION_FIELD]: {
    label: 'FACE Description',
    Component: FaceDescriptionFilter
  },
  [PROGRAM_OFFICER_FIELD]: {
    label: 'UNICEF Responsible Person',
    Component: ProgramOfficerFilter
  },
  [FACE_DATE_FIELD]: {
    label: 'FACE Date',
    Component: FaceDateFilter
  },
  [HEAD_OFFICE_FIELD]: {
    label: 'Head of Office',
    Component: HeadOfficeFilter
  },
  [UPLOADING_APP_FIELD]: {
    label: 'Uploading App',
    Component: UploadingAppFilter
  },
  [UPLOADED_BY_FIELD]: {
    label: 'Uploaded By',
    Component: UploadedByFilter
  },

};

export const getPageFilters = () => {
  return keys(FILTERS_MAP);
};
