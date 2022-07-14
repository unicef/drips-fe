import SearchableDropdownAsyncFilterFactory from '../lib/searchable-dropdown-async-filter-factory';
import {get} from '../../../api/search-index';

const getDataAsynchronously = (searchText) => {
  return get('/bap-metadata/', {code__startswith: searchText});
}

export default SearchableDropdownAsyncFilterFactory(getDataAsynchronously, 'BAP Document No', 'code', 'code')
