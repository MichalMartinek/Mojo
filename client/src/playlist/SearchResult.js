/* @flow */
import * as React from 'react';
import type {Video} from "./types";
import VideoListItem from "./VideoListItem";

type Props = {
  videos: Array<Video>,
  itemClick: (item: Video) => void,
};

const SearchResult = ({ videos, itemClick}: Props) => {
  return (
    <div className="searchResult__Container">
      {
        videos.length ?
          videos.map((item) => (
            <VideoListItem baseClassName="searchItem" video={item} key={item.id} onClick={()=>itemClick(item)}/>
          )) :
          <div>
            Nothing
          </div>
      }
    </div>
  )
}

export default SearchResult