import { FORM_CONFIG } from 'lib/constants';
import { selectFaceType } from 'selectors/collections';
import DropdownMultiFilterFactory from '../lib/dropdown-multi-filter.factory';

export default DropdownMultiFilterFactory(selectFaceType, FORM_CONFIG.faceType.label);
