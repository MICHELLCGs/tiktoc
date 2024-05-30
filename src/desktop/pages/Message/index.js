import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { useEventContext } from '../../Context/hooks';

import './index.scss';

const Message = () => {
  const [state, dispatch] = useEventContext();
  const video01 = useRef();
  // 1. setLike và hiệu ứng của like lại liên tục sau khi click
  // 2. ẩn like sau khi kết thúc hành động
  //
  const handleVideoClick = (e) => {
    const { clientX, clientY } = e;
    const { top, left } = video01.current.getBoundingClientRect();
    let x = clientX - left - 10;
    let y = clientY - top - 60;
    dispatch({ type: 'checkAnimationPosition', payload: { x: x, y: y } });
    dispatch({ type: 'doubleClickVideo', payload: true });
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'doubleClickVideo' });
    }, 2000);
  }, [state.doubleClickVideo]);

  return (
    <>
      <div className="display-video01">
        <video
          ref={video01}
          className="video01"
          onClick={handleVideoClick}
          height="300px"
          alt="02"
          src="/videos/01.mp4"
        />
        <div
          className="animated-heart"
          style={{ left: state.positionDoubleClickVideo.x, top: state.positionDoubleClickVideo.y }}
        >
          {state.doubleClickVideo ? (
            <div
              onClick={() => {
                dispatch({ type: 'doubleClickVideo', payload: true });
              }}
              className="father-heart"
            >
              <img
                className={clsx({ ['heart01']: state.doubleClickVideo })}
                src="/logos/heart-in-video.png"
                alt="like01"
              />
              <img
                className={clsx({ ['heart02']: state.doubleClickVideo })}
                src="/logos/heart-in-video.png"
                alt="like02"
              />
              <img
                className={clsx({ ['heart03']: state.doubleClickVideo })}
                src="/logos/heart-in-video.png"
                alt="like03"
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export const LayoutMessage = ({ children }) => {
  return <>{children}</>;
};

export default Message;
