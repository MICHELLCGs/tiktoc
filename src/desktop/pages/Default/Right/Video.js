import { useEffect, useRef } from "react";
import clsx from "clsx";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";

import {
  BackgroundVolume1,
  BackgroundVolume2,
  ColorScrollBar,
} from "./StyleRight";
import { useEventContext } from "../../../Context/hooks";

const Video = () => {
  const [state, dispatch] = useEventContext();
  const idVideo = useRef();
  let clickTimer = null;
  const navigate = useNavigate();

  useEffect(() => {
    idVideo.current.volume = state.sizeVolume / 100;
  }, [state.sizeVolume]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "doubleClickVideo" });
    }, 2000);
  }, [state.doubleClickVideo]);

  const handleClickVideo = (e) => {
    if (!clickTimer) {
      clickTimer = setTimeout(() => {
        navigate("/user-id/video/id-video");
        clearTimeout(clickTimer);
        clickTimer = null;
      }, 500);

      return;
    }

    dispatch({ type: "like", payload: true });

    clearTimeout(clickTimer);
    clickTimer = null;

    const { clientX, clientY } = e;
    const { top, left } = idVideo.current.getBoundingClientRect();
    let x = clientX - left - 10;
    let y = clientY - top - 60;
    dispatch({ type: "checkAnimationPosition", payload: { x: x, y: y } });
    dispatch({ type: "doubleClickVideo", payload: true });
  };
  const HandleChangeVolume = (e) => {
    const { clientY } = e;
    const y = Math.floor(
      (clientY - e.target.getBoundingClientRect().top) / 1.25
    );
    console.log("positon unit scroll now:" + y);
    changeAndSaveVolume(y);
  };

  function HandlePlayVideo() {
    if (state.statusVideo) {
      idVideo.current.pause();

      dispatch({ type: "statusVideo" });
      return;
    }
    idVideo.current.play();
    dispatch({ type: "statusVideo" });
  }

  function HandleTurnVolume() {
    if (state.volume) {
      idVideo.current.volume = 0;
      dispatch({ type: "volume" });
      return;
    }
    idVideo.current.volume = 1;
    dispatch({ type: "volume" });
  }

  function changeAndSaveVolume(volumeNow) {
    dispatch({ type: "save-volume-now", payload: volumeNow });
    if (state.volumeNow === 40) {
      dispatch({ type: "volume", payload: false });
    }
    if (
      Math.max(state.volumeNow, state.volumeBefore) === state.volumeNow &&
      state.volumeNow !== state.volumeBefore
    ) {
      dispatch({
        type: "decrease-volume",
        payload: state.volumeNow - state.volumeBefore,
      });

      dispatch({ type: "onChange-volume", payload: state.volumeNow });
      return;
    }

    if (state.volumeNow !== state.volumeBefore && state.sizeVolume <= 100) {
      dispatch({
        type: "increase-volume",
        payload: state.volumeBefore - state.volumeNow,
      });
    }

    dispatch({ type: "onChange-volume", payload: state.volumeNow });
  }

  const trackPositon = ({ y }) => {
    changeAndSaveVolume(y);
  };

  return (
    <>
      <div className="display-video">
        <video
          onClick={handleClickVideo}
          loop
          ref={idVideo}
          alt="01"
          src="/videos/01.mp4"
        />
        <div
          className="animated-heart"
          style={{
            left: state.positionDoubleClickVideo.x,
            top: state.positionDoubleClickVideo.y,
          }}
        >
          {state.doubleClickVideo ? (
            <div
              onClick={() => {
                dispatch({ type: "doubleClickVideo", payload: true });
              }}
              className="father-heart"
            >
              <img
                className={clsx({ ["heart01"]: state.doubleClickVideo })}
                src="/logos/heart-in-video.png"
                alt="like01"
              />
              <img
                className={clsx({ ["heart02"]: state.doubleClickVideo })}
                src="/logos/heart-in-video.png"
                alt="like02"
              />
              <img
                className={clsx({ ["heart03"]: state.doubleClickVideo })}
                src="/logos/heart-in-video.png"
                alt="like03"
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={clsx(
            "playpause",
            state.statusVideo ? ["playVideo"] : ["pauseVideo"]
          )}
          onClick={HandlePlayVideo}
        ></div>
        <div className="volume">
          <div className="father-scrollbar">
            <div className="scrollbar" onClick={HandleChangeVolume}>
              <Draggable
                bounds={{ top: 0, bottom: 40 }}
                defaultPosition={{ x: 0, y: 0 }}
                onDrag={(e, data) => trackPositon(data)}
                axis="y"
              >
                <ColorScrollBar volume={state.volume} />
              </Draggable>
              <BackgroundVolume1
                volume={state.volume}
                amount={state.volumeBefore}
              />
              <BackgroundVolume2
                volume={state.volume}
                amount={state.volumeBefore}
              />
            </div>
          </div>
          <img
            onClick={HandleTurnVolume}
            height="16px"
            src={
              state.volume
                ? "/logos/volume-turn-on.svg"
                : "/logos/volume-turn-off.svg"
            }
            alt="volume"
          />
        </div>
      </div>
    </>
  );
};

export default Video;
