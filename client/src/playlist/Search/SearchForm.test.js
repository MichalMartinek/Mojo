import React from 'react';
import { mount } from 'enzyme';
import SearchForm from './SearchForm';
const props = {
  inputText: '',
  focused: false
};
describe('SearchForm', () => {
  it('always renders', () => {
    const mockFn = jest.fn();
    const searchForm = mount(<SearchForm handleForm={mockFn} {...props} />);
    const form = searchForm.find('.searchForm');
    expect(form.length).toBe(1);
  });
  it('use focused correctly', () => {
    const mockFn = jest.fn();
    let searchForm = mount(<SearchForm handleForm={mockFn} {...props} />);
    expect(searchForm.find('.searchForm--focused').length).toBe(0);
    searchForm = mount(
      <SearchForm handleForm={mockFn} {...props} focused={true} />
    );
    expect(searchForm.find('.searchForm--focused').length).toBe(1);
  });
  it('call handleForm function', () => {
    const mockFn = jest.fn();
    const searchForm = mount(<SearchForm handleForm={mockFn} {...props} />);
    const form = searchForm.find('.searchForm');
    form.simulate('submit');
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('change inner state', () => {
    const mockFn = jest.fn();
    const searchForm = mount(<SearchForm onChange={mockFn} {...props} />);
    searchForm
      .find('.searchForm__input')
      .simulate('change', { target: { value: 'test' } });
    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe('test');
  });
});
