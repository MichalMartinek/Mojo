import React from 'react';
import { mount } from 'enzyme';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('always renders', () => {
    const mockFn = jest.fn();
    const searchForm = mount(<SearchForm handleForm={mockFn} />);
    const form = searchForm.find('form.search__form');
    expect(form.length).toBe(1);
  });
  it('call handleForm function', () => {
    const mockFn = jest.fn();
    const searchForm = mount(<SearchForm handleForm={mockFn} />);
    const form = searchForm.find('form.search__form');
    form.simulate('submit');
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('change inner state', () => {
    const mockFn = jest.fn();
    const searchForm = mount(<SearchForm onChange={mockFn} />);
    searchForm
      .find('.searchForm__input')
      .simulate('change', { target: { value: 'test' } });
    expect(mockFn.mock.calls).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe('test');
  });
});
