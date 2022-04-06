import { FORM_CONFIG } from 'lib/constants';
import { selectBapDocumentType } from 'selectors/collections';
import DropdownMultiFilterFactory from '../lib/dropdown-multi-filter.factory';

export default DropdownMultiFilterFactory(selectBapDocumentType, FORM_CONFIG.bapDocumentType.label);
