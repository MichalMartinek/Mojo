import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Search from '../playlist/Search/Search';
import { action } from '@storybook/addon-actions';

const SearchDoc = `
      is component containing search form and search results.
      This component use whole place around.`

const commonProps = {
  itemClick: action('item-click'),
  handleSearch: action('searchForm-submit'),
  hasMore: true,
}
const results = [
  {
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
  },
  {
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
  }]
storiesOf('Search', module)
  .add('initial state',
    withInfo(SearchDoc)(() =>
      <div style={{width: 1000, height: 300}}>
        <Search results={null} {...commonProps}/>
      </div>
    )
  )
  .add('successful search',
    withInfo(SearchDoc)(() =>
      <div style={{width: 1000, height: 300}}>
        <Search {...commonProps} results={results}/>
      </div>
    )
  )
  .add('nothing found',
    withInfo(SearchDoc)(() =>
      <div style={{width: 1000, height: 300}}>
        <Search {...commonProps} results={[]}/>
      </div>
    )
  )