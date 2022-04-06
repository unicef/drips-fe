import { FORM_CONFIG } from 'lib/constants';
import { selectCSOType } from 'selectors/collections';
import DropdownFilterFactory from '../lib/dropdown-filter-factory';

export default DropdownFilterFactory(selectCSOType, FORM_CONFIG.csoType.label);
