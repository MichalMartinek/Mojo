/* @flow */
import * as React from 'react';
import type {Video} from "../playlist/types";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

type Props = {
  video: Video,
  onClick: (id:string) => void,
};

const SearchResultItem = ({ video, onClick }: Props) => {
  return (
    <div className="searchItem" onClick={onClick}>
      <div className="searchItem__inner">
        <div className="searchItem__children" onClick={(e)=> e.stopPropagation()}>
          <FontAwesomeIcon icon="plus" />
        </div>
        <div className="searchItem__info">
          <h4 className="searchItem__title">{video.title}</h4>
          <h4 className="searchItem__channel">{video.channelTitle}</h4>
        </div>
        <div className="searchItem__imgContainer">
          <img className="searchItem__thumbnail" src={video.thumbnails.medium.url} alt={video.title}/>
        </div>
      </div>
    </div>
  )
}

export default SearchResultItem