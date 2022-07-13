import axios from 'axios';
import {
  getCookie
} from './helpers';
import Qs from 'qs';
import {
  REACT_APP_COSTCENTERS_ENDPOINT,
  REACT_APP_SEARCH_API
} from './endpoints';

const backendPath = '/drips/api';

const getBaseOptions = () => ({
  headers: {
    'X-CSRFToken': getCookie('csrftoken')
  },

  withCredentials: true,
  paramsSerializer: function(params) {
    return Qs.stringify(params, {
      arrayFormat: 'comma'
    });
  }
});

export async function get(uri, params = {}, options = getBaseOptions()) {
  const opt = {
    method: 'GET',
    params
  };
  const response = await axios.get(`${backendPath}${uri}`, {
    ...opt,
    ...options
  });
  return response.data;
}

export async function fetchSearchReports(params) {
  const computedUrl = REACT_APP_SEARCH_API;
  return get(computedUrl, params);
}

export async function fetchCostCenters(params) {
  const computedUrl = REACT_APP_COSTCENTERS_ENDPOINT;
  return get(computedUrl, params);
}
