import React from 'react';
import { shallow, render } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';
import preload from '../../data.json';
import Search, { Unwrapped as UnwrappedSearch } from '../Search';
import ShowCard from '../ShowCard';
import { setSearchTerm } from '../actionCreators';

test('Search render correctly', () => {
  const component = shallow(
    <UnwrappedSearch shows={preload.shows} searchTerm="" />
  );
  expect(component).toMatchSnapshot();
});

test('Search should render correct amount of shows', () => {
  const component = shallow(
    <UnwrappedSearch shows={preload.shows} searchTerm="" />
  );
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('Search should render correct amount of shows based on search term -- without Redux', () => {
  const searchWord = 'black';
  const component = shallow(
    <UnwrappedSearch shows={preload.shows} searchTerm={searchWord} />
  );
  const showCount = preload.shows.filter(
    show =>
      `${show.title} ${show.description}`
        .toUpperCase()
        .indexOf(searchWord.toUpperCase()) >= 0
  );
  expect(component.find(ShowCard).length).toEqual(showCount.length);
});

test('Search should render correct amount of shows based on search term -- with Redux', () => {
  const searchWord = 'black';
  store.dispatch(setSearchTerm(searchWord));
  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Search shows={preload.shows} />
      </MemoryRouter>
    </Provider>
  );
  const showCount = preload.shows.filter(
    show =>
      `${show.title} ${show.description}`
        .toUpperCase()
        .indexOf(searchWord.toUpperCase()) >= 0
  );
  expect(component.find('.show-card').length).toEqual(showCount.length);
});
