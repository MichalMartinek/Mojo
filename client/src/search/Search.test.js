import React from "react"
import { mount } from "enzyme"
import SearchForm from './SearchForm'
import SearchResult from './SearchResult'
import Search from './Search'

const props = {
  results: [],
  itemClick: jest.fn(),
  handleSearch: jest.fn(),
  hasMore: false,
}

describe("Search", () => {
  it("always renders SearchForm and SearchResult", () => {
    const search = mount(
      <Search {...props} />
    )
    expect(search.find(SearchForm).length).toBe(1)
    expect(search.find(SearchResult).length).toBe(1)
  })
})