export const BACKEND_REPORTS_FIELDS = {
  title: 'title',
  recipientOffice: 'recipient_office',
  grant: 'grant_number',
  reportType: 'report_type',
  donorDocument: 'donor_document',
  reportEndDate: 'report_end_date',
  grantExpiryDate: 'grant_expiry_date'
};

export const BACKEND_THEMATIC_FIELDS = {
  title: 'title',
  theme: 'theme',
  recipientOffice: 'recipient_office',
  reportType: 'report_type',
  reportEndDate: 'report_end_date'
};

// QUERY PARAM FIELD NAMES FOR BACKEND
export const TITLE_FIELD = 'title__contains';
export const FRAMEWORK_FIELD = 'framework_agreement';
export const COUNTRY_FIELD = 'recipient_office';
export const GRANT_FIELD = 'grant_number';
export const EXTERNAL_REF_GRANT_FIELD = 'external_reference';
export const REPORT_TYPE_FIELD = 'report_type';
export const REPORT_GROUP_FIELD = 'report_group';
export const AWARD_TYPE_FIELD = 'award_type';
export const REPORT_END_DATE_FIELD = 'report_end_date';
export const REPORT_END_DATE_BEFORE_FIELD = 'report_end_date__lte';
export const REPORT_END_DATE_AFTER_FIELD = 'report_end_date__gte';
export const REPORT_PERIOD_FIELD = 'report_period';
export const REPORT_GENERATED_FIELD = 'report_generated_by';
export const THEME_FIELD = 'theme';
export const GRANT_EXPIRY_DATE_FIELD = 'grant_expiry_date';
export const GRANT_EXPIRY_BEFORE_FIELD = 'grant_expiry_date__lte';
export const GRANT_EXPIRY_AFTER_FIELD = 'grant_expiry_date__gte';
export const GRANT_ISSUE_YEAR = 'grant_issue_year';
export const REPORT_CATEGORY_FIELD = 'donor_report_category';
export const DONOR_DOCUMENT_FIELD = 'donor_document';
export const RECERTIFIED_FIELD = 'recertified';
export const RECIPIENT_OFFICE_FIELD = 'recipient_office';
export const MODIFIED_BEFORE_FIELD = 'modified__lte';
export const MODIFIED_AFTER_FIELD = 'modified__gte';


export const IP_TYPE_FIELD = 'ip_type';
export const CSO_TYPE_FIELD = 'cso_type';
export const OFFICE_FIELD = 'responsible_office__contains';
export const RISK_RATING_FIELD = 'partner_risk_rating'; // @dci ??? seems it's not working on fitlering
export const BAP_DOCUMENT_TYPE_FIELD = 'b_a_p_document_type';
export const DOCUMENT_TYPE_FIELD = 'attachment_type';
export const FACE_TYPE_FIELD = 'face_form_type';
export const UPLOADING_APP_FIELD = 'documentuploaded_app';
export const IP_NO_FIELD = 'implementing_partner_code__contains';
export const BAP_DOCUMENT_NO_FIELD = 'b_a_p_document_no__contains';
export const FACE_NO_FIELD = 'face_form_no__contains';
export const PROGRAM_OFFICER_FIELD = 'responsible_person__contains';
export const FACE_DATE_FIELD = 'f_a_c_e_form_date';
export const HEAD_OFFICE_FIELD = 'head_office'; // @dci ???
export const UPLOADED_BY_FIELD = 'uploaded_by__contains';


// PROPERTIES TO BE USED FOR QUERY
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DISPLAY_FORMAT = 'yyyy-MMM-dd';
