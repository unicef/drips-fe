import { selectCostCenter } from 'selectors/collections';
import SearchableDropdownFilterFactory from '../lib/searchable-dropdown-filter-factory';

export default SearchableDropdownFilterFactory(selectCostCenter, 'Office', 'description', 'code');
