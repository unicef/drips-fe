import axios from 'axios';
import {
  getCookie
} from './helpers';
import Qs from 'qs';
import {
  REACT_APP_METADATA_ENDPOINT,
  REACT_APP_PROFILE_ENDPOINT,
  REACT_APP_BUSINESS_AREA_ENDPOINT,
  REACT_APP_CONFIG_ENDPOINT
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

export function getBusinessArea() {
  return get(REACT_APP_BUSINESS_AREA_ENDPOINT);
}

export function getMetadata() {
  return get(REACT_APP_METADATA_ENDPOINT);
}

export function getConfig() {
  return get(REACT_APP_CONFIG_ENDPOINT);
}

export function getUserProfile() {
  return get(REACT_APP_PROFILE_ENDPOINT);
}
