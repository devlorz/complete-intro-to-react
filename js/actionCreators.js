// @flow

import { SET_SEARCH_TERM } from './action';

export function setSearchTerm(searchTerm: string) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}
