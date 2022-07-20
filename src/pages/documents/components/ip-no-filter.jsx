import SearchableDropdownAsyncFilterFactory from '../lib/searchable-dropdown-async-filter-factory';
import {get} from '../../../api/search-index';

const getDataAsynchronously = (searchText) => {
  return get('/ip-metadata/', {code__startswith: searchText});
}

export default SearchableDropdownAsyncFilterFactory(getDataAsynchronously, 'IP No', 'code', 'code')
