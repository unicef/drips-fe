import { selectCostCenter } from 'selectors/collections';
import SearchableDropdownFilterFactory from '../lib/searchable-dropdown-filter-factory';

const getValueFromObj = (obj) => {
  return obj ? obj.code : '';
};

export default SearchableDropdownFilterFactory(selectCostCenter, 'Office', getValueFromObj, 'description');
