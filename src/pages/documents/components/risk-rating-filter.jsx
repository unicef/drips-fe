import { FORM_CONFIG } from 'lib/constants';
import { selectRiskRating } from 'selectors/collections';
import DropdownMultiFilterFactory from '../lib/dropdown-multi-filter.factory';

export default DropdownMultiFilterFactory(selectRiskRating, FORM_CONFIG.riskRating.label);
