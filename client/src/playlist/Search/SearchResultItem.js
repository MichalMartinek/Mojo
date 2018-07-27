/* @flow */
import * as React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import type { Video } from '../types';

type Props = {
  video: Video,
  onClick: (id: string) => void
};

const SearchResultItem = ({ video, onClick }: Props) => {
  return (
    <div className="searchItem" onClick={onClick}>
      <div className="searchItem__imgContainer">
        <img
          className="searchItem__thumbnail"
          src={video.thumbnails.medium.url}
          alt={video.title}
        />
      </div>
      <div className="searchItem__info">
        <h4 className="searchItem__title">
          <LinesEllipsis
            text={video.title}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </h4>
        <h4 className="searchItem__channel">
          <LinesEllipsis
            text={video.channelTitle}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </h4>
      </div>
    </div>
  );
};

export default SearchResultItem;
