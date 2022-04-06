import {
  DOCUMENTS
} from './constants';

export function getSubheadingFromParams(pathname) {
  if (pathname.includes(DOCUMENTS)) {
    return 'Documents';
  }
  return '';
  //return `${pageName} ${donorName && 'for'} ${donorName}`;
}
