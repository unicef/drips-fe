import { FORM_CONFIG } from 'lib/constants';
import { selectIPType } from 'selectors/collections';
import DropdownFilterFactory from '../lib/dropdown-filter-factory';

export default DropdownFilterFactory(selectIPType, FORM_CONFIG.ipType.label);
