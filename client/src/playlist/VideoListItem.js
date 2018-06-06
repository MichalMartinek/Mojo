/* @flow */
import * as React from 'react';
import type {Video} from "./types";

type Props = {
  video: Video,
  onClick: (id:string) => void,
  baseClassName: string,
};

const VideoListItem = ({ video, onClick, baseClassName }: Props) => {
  return (
    <div className={`${baseClassName}`} onClick={onClick}>
      <div className={`${baseClassName}__info`}>
        <h4 className={`${baseClassName}__title`}>{video.title}</h4>
        <h4 className={`${baseClassName}__channel`}>{video.channelTitle}</h4>
      </div>
      <div className={`${baseClassName}__imgContainer`}>
        <img className={`${baseClassName}__thumbnail`} src={video.thumbnails.medium.url}/>
      </div>
    </div>
  )
}

export default VideoListItem