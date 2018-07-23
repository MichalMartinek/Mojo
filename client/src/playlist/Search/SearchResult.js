/* @flow */
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../../common/Spinner';
import type { Video } from '../types';
import SearchResultItem from './SearchResultItem';

type Props = {
  videos: Array<Video>,
  itemClick: (item: Video) => void,
  loadMore: () => void,
  hasMore: boolean
};

const SearchResult = ({ videos, itemClick, loadMore, hasMore }: Props) => {
  if (videos.length) {
    return (
      <div className="searchResult customScrollbar">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          threshold={255}
          useWindow={false}
          className="searchResult__container"
          loader={
            <div className="searchResult__loader" key={0}>
              <Spinner />
            </div>
          }
        >
          {videos.map((item, index) => (
            <SearchResultItem
              baseClassName="searchItem"
              video={item}
              key={index}
              onClick={() => itemClick(item)}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
  return <div>Nothing</div>;
};

export default SearchResult;
