import { FORM_CONFIG } from 'lib/constants';
import { selectOffice } from 'selectors/collections';
import DropdownMultiFilterFactory from '../lib/dropdown-multi-filter.factory';

export default DropdownMultiFilterFactory(selectOffice, FORM_CONFIG.office.label);
