import {
  DOCUMENTS
} from './constants';

export function getSubheadingFromParams(pathname, businessArea = '', businessCode = '') {
  let pageName = null;
  if (pathname.includes(DOCUMENTS)) {
    pageName = 'Documents';
  }
  if (!pageName) {
    return '';
  }
  if (businessCode !== '') {
    businessCode = ` [${businessCode}]`;
  }
  return `${pageName} for ${businessArea} ${businessCode}`;
}
