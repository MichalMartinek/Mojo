/* @flow */
import * as React from 'react';
import type {Video} from "../playlist/types";

type Props = {
  video: Video,
  children?: React.Node,
  onClick: (id:string) => void,
  baseClassName: string,
};

const VideoListItem = ({ video, onClick, baseClassName, children }: Props) => {
  return (
    <div className={`${baseClassName}`} onClick={onClick}>
      <div className={`${baseClassName}__inner`}>
        {children &&
        <div className={`${baseClassName}__children`} onClick={(e)=> e.stopPropagation()}>
          {children}
        </div>
        }
        <div className={`${baseClassName}__info`}>
          <h4 className={`${baseClassName}__title`}>{video.title}</h4>
          <h4 className={`${baseClassName}__channel`}>{video.channelTitle}</h4>
        </div>
        <div className={`${baseClassName}__imgContainer`}>
          <img className={`${baseClassName}__thumbnail`} src={video.thumbnails.medium.url} alt={video.title}/>
        </div>
      </div>
    </div>
  )
}

export default VideoListItem