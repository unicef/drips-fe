import { FORM_CONFIG } from 'lib/constants';
import { selecDocumentType } from 'selectors/collections';
import DropdownFilterFactory from '../lib/dropdown-filter-factory';

export default DropdownFilterFactory(selecDocumentType, FORM_CONFIG.documentType.label);
