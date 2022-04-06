import axios from 'axios';
import {
  getCookie
} from './helpers';
import Qs from 'qs';
import {
  REACT_APP_USER_STATIC_ENDPOINT,
  REACT_APP_METADATA_ENDPOINT,
  REACT_APP_PROFILE_ENDPOINT,
  REACT_APP_BUSINESS_AREA_ENDPOINT,
  REACT_APP_REPORTS_ENDPOINT,
  REACT_APP_CONFIG_ENDPOINT
} from './endpoints';

const currentDate = () => {
  let date = new Date();
  return date.getFullYear();
};

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

const setTenantName = () => {
  if (window.location.href.includes('tst') || window.location.href.includes('localhost')) {
    return 'unitst';
  }
  return 'unicef';
}

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

export function getStaticAssets() {
  return get(REACT_APP_USER_STATIC_ENDPOINT);
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

export async function getReports(params, year = currentDate()) {
  params = {
    ...params,
    retracted__not: 'yes'
  }
  const computedUrl = REACT_APP_REPORTS_ENDPOINT.replace('<envvar>', setTenantName()).replace('<folder>', `${year}`);
  return get(computedUrl, params);
}
