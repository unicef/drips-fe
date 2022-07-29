import { FORM_CONFIG } from 'lib/constants';
import { selectUploadingApp } from 'selectors/collections';
import DropdownFilterFactory from '../lib/dropdown-filter-factory';

export default DropdownFilterFactory(selectUploadingApp, FORM_CONFIG.uploadingApp.label);
