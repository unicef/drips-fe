import { FORM_CONFIG } from 'lib/constants';
import { selectHeadOffice } from 'selectors/collections';
import DropdownFilterFactory from '../lib/dropdown-filter-factory';

export default DropdownFilterFactory(selectHeadOffice, FORM_CONFIG.headOffice.label, 'description', true);
