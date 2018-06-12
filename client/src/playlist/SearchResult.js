/* @flow */
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Spinner from '../common/Spinner';
import type {Video} from "./types";
import VideoListItem from "./VideoListItem";

type Props = {
  videos: Array<Video>,
  itemClick: (item: Video) => void,
  loadMore: () => void,
  hasMore: boolean,
};

const SearchResult = ({ videos, itemClick, loadMore, hasMore}: Props) => {
  return (
    <div className="searchResult__container customScrollbar">
      {
        videos.length ?
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            threshold={35}
            useWindow={false}
            loader={<div className="searchResult__loader" key={0}><Spinner /></div>}
          >
            {
              videos.map((item, index) => (
                <VideoListItem baseClassName="searchItem" video={item} key={index} onClick={()=>itemClick(item)}>
                  <FontAwesomeIcon icon="plus" />
                </VideoListItem>
              ))
            }
          </InfiniteScroll>
        :
          <div>
            Nothing
          </div>
      }
    </div>
  )
}

export default SearchResult