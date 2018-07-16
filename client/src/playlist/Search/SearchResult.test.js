import React from "react"
import { mount } from "enzyme"
import SearchResult from './SearchResult'

const props = {
  videos: [ {
      description: "Description",
      channelTitle: "Author/Channel",
      title: "Title",
      thumbnails: {
        medium: {
          url: 'https://images.unsplash.com/photo-1495183100528-6acc1f0d9146?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3558575c3dfe47c782ec070964bf91c&auto=format&fit=crop&w=500&q=60',
          height: 460,
          width: 380,
        },
      }
    }, {
      description: "Description",
      channelTitle: "Author/Channel",
      title: "Title",
      thumbnails: {
        medium: {
          url: 'https://images.unsplash.com/photo-1495183100528-6acc1f0d9146?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3558575c3dfe47c782ec070964bf91c&auto=format&fit=crop&w=500&q=60',
          height: 460,
          width: 380,
        },
      }
  }],
  itemClick: jest.fn(),
  loadMore: jest.fn(),
  hasMore: false,
}

describe("SearchResult", () => {
  it("always renders div with videos", () => {
    const searchResult = mount(
      <SearchResult {...props} />
    )
    const container = searchResult.find('.searchResult__container')
    console.log(searchResult.find('.searchItem'))
    expect(container.length).toBe(1)
    expect(searchResult.find('.searchItem').length).toBe(props.videos.length)
  })
})