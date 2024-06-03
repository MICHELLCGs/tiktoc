import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useEventContext } from '../../Context/hooks';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../../../components/SearchBar';
import './index.scss';

const DetailVideo = () => {
  const [state, dispatch] = useEventContext();
  const [focusCommand, setFocusCommand] = useState(false);
  const [hover, setHover] = useState(false);
  const [alertTemporary, setAlertTemporary] = useState(false);
  const [hoverAccuse, setHoverAccuse] = useState(false);
  const [btnAccuse, setBtnAccuse] = useState(false);
  const idVideo = useRef();
  const linkVideo = useRef(null);
  const navigate = useNavigate();
  let clickTimer = null;

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'doubleClickVideo' });
    }, 2000);
  }, [state.doubleClickVideo]);

  useEffect(() => {
    setTimeout(() => {
      setHover(false);
    }, 10000);
  }, [hover]);

  useEffect(() => {
    setTimeout(() => {
      setAlertTemporary(false);
    }, 2000);
  }, [alertTemporary]);

  const HandleLike = () => {
    // set State and check with clsx
    dispatch({ type: 'like' });
  };
  const HandleSave = () => {
    dispatch({ type: 'save' });
  };

  const handleClickVideo = (e) => {
    // luôn luôn được gọi trong lần đầu tiền click
    if (!clickTimer) {
      clickTimer = setTimeout(() => {
        HandlePlayVideo();
        clearTimeout(clickTimer);
        clickTimer = null;
      }, 200);

      return;
    }
    // click lần thứ hai trong thời gian 200ms thì sẽ nhảy xuống đây
    dispatch({ type: 'like', payload: true });

    clearTimeout(clickTimer);
    clickTimer = null;
    // get tọa độ của sự kiện click và show trái tim
    const { clientX, clientY } = e;
    // full screen và sát lề trái nên không cần getBoundingClientRect() để lấy ví trí chênh lệch giữa top và left của phần tử trong tag body
    let x = clientX - 10;
    let y = clientY - 60;
    dispatch({ type: 'checkAnimationPosition', payload: { x: x, y: y } });
    dispatch({ type: 'doubleClickVideo', payload: true });
  };

  function HandlePlayVideo() {
    if (state.statusVideo) {
      idVideo.current.pause();
      // setStatusVideo(!statusVideo);
      dispatch({ type: 'statusVideo' });
      return;
    }
    idVideo.current.play();
    dispatch({ type: 'statusVideo' });
  }

  const HandleHoverOpen = () => {
    setHover(true);
  };
  const HandleHoverClose = () => {
    setHover(false);
  };

  const HandleChangeCommand = (e) => {
    dispatch({ type: 'changeCommand', payload: e.target.value });
  };

  const HandleCoppyLink = () => {
    const link = linkVideo.current.textContent;
    navigator.clipboard.writeText(link);
    setAlertTemporary(true);
  };

  const HandleHoverAccuseOpen = () => {
    setHoverAccuse(true);
  };
  const HandleHoverAccuseClose = () => {
    setHoverAccuse(false);
  };

  const HandleHoverBtnAccuseOpen = () => {
    setBtnAccuse(true);
  };
  const HandleHoverBtnAccuseClose = () => {
    setBtnAccuse(false);
  };

  const HandleReturnPageBefore = () => {
    navigate(-1);
  };

  return (
    <>
      {alertTemporary ? <div className="alert-temporary">Sao chép thành công</div> : ''}
      <div className="index-element">
        <div className="video-element">
          <div className="header-video">
            <div className="flexbox01">
              <svg
                onClick={HandleReturnPageBefore}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width={256}
                height={256}
                viewBox="0 0 256 256"
                xmlSpace="preserve"
              >
                <defs></defs>
                <g
                  style={{
                    stroke: 'none',
                    strokeWidth: 0,
                    strokeDasharray: 'none',
                    strokeLinecap: 'butt',
                    strokeLinejoin: 'miter',
                    strokeMiterlimit: 10,
                    fill: 'none',
                    fillRule: 'nonzero',
                    opacity: 1,
                  }}
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                >
                  <path
                    d="M 45 0 C 20.187 0 0 20.187 0 45 c 0 24.813 20.187 45 45 45 c 24.813 0 45 -20.187 45 -45 C 90 20.187 69.813 0 45 0 z M 64.328 58.672 c 1.563 1.562 1.563 4.095 0 5.656 c -0.78 0.781 -1.805 1.172 -2.828 1.172 s -2.048 -0.391 -2.828 -1.172 L 45 50.657 L 31.329 64.328 C 30.547 65.109 29.524 65.5 28.5 65.5 s -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 L 39.343 45 L 25.671 31.329 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 L 45 39.343 l 13.672 -13.672 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 L 50.657 45 L 64.328 58.672 z"
                    style={{
                      stroke: 'none',
                      strokeWidth: 1,
                      strokeDasharray: 'none',
                      strokeLinecap: 'butt',
                      strokeLinejoin: 'miter',
                      strokeMiterlimit: 10,
                      fill: 'rgb(130,130,130)',
                      fillRule: 'nonzero',
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                </g>
              </svg>
              <img src="/public/logos/logo-tiktok.svg" />
            </div>
            <div className="flexbox02">
              <SearchBar
                searchBar="searchBar-in-video"
                input="input-in-video"
                span="span-in-video"
                button="button-in-video"
                img="img-in-video"
                color="white"
              />
            </div>
            <div className="flexbox03">accuse</div>
          </div>
          <div onClick={HandlePlayVideo} className="background-video"></div>
          <video
            muted={true}
            className="video"
            onClick={handleClickVideo}
            loop
            ref={idVideo}
            alt="01"
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
                  key="1"
                />
                <img
                  className={clsx({ ['heart02']: state.doubleClickVideo })}
                  src="/logos/heart-in-video.png"
                  alt="like02"
                  key="2"
                />
                <img
                  className={clsx({ ['heart03']: state.doubleClickVideo })}
                  src="/logos/heart-in-video.png"
                  alt="like03"
                  key="3"
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="commands-element">
          <div className="inforVideo">
            <div className="margin-equal inforUser">
              <div onMouseEnter={HandleHoverOpen} onMouseLeave={HandleHoverClose} className="element-infor">
                <img className="avatar" src="/img-user-upload/avatar01.jpeg" alt="Hán Anh Thư" />
                <div className="name">
                  <div className="nickName">
                    <b>thunoss</b>
                  </div>
                  <div className="realName-and-date">Hán Anh Thư . 1 ngày trước</div>
                </div>
                {/* -------------------- */}
                {hover ? (
                  <div className="menuHover">
                    <div className="margin-left avatar-and-btn-follow">
                      <img className="avatar" src="/img-user-upload/avatar01.jpeg" alt="Hán Anh Thư" />
                      <button className="btn-follow-user">Follow</button>
                    </div>
                    <div className="margin-left mini-nickName">thusnoss</div>
                    <div className="margin-left mini-realName">Hán Anh Thư</div>
                    <div className="margin-left ammount-follower-and-like">
                      <span>
                        <b>146.1K</b>Follower
                      </span>
                      <span>
                        <b>2.6MK</b>Thích
                      </span>
                    </div>
                    <div className="des-user">
                      <img src="/logos/des-user.png" />
                      Hansthuw1511@gmail.com Kệ mẹ đời, tớ ăn chocopie
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {/* ------------------------ */}
              </div>
              <button className="btn-follow-user btn-follow-user-main">Follow</button>
            </div>
            <div className="margin-equal cap-and-hashtagVideo">
              Hướng dương đẹp vải ae 🌻<b>#xuhuong</b> <b>#fyp</b> <b>#viral</b>
            </div>
            <div className="margin-equal musicVideo">
              <img src="/logos/music-note.png" />
              <b>nhạc nền - kghn.</b>
            </div>
            <div className="margin-equal two-function">
              <div className=" ammount-interactVideo">
                <div className="amount-like" onClick={HandleLike}>
                  <svg
                    className="heart-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width="16"
                    height="16"
                    viewBox="0 0 256 256"
                    xmlSpace="preserve"
                  >
                    <defs></defs>
                    <g
                      style={{
                        stroke: 'none',
                        strokeWidth: 0,
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: 'none',
                        fillRule: 'nonzero',
                        opacity: 1,
                      }}
                      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                    >
                      <path
                        className={clsx('path-heart-svg', { ['path-heart-svg-liked']: state.like })}
                        d="M 42.901 85.549 c 1.059 1.383 3.138 1.383 4.197 0 c 7.061 -9.223 28.773 -25.692 33.475 -30.82 c 12.568 -12.568 12.568 -32.946 0 -45.514 h 0 c -8.961 -8.961 -26.859 -7.239 -34.145 3.1 c -0.699 0.992 -2.158 0.992 -2.857 0 C 36.286 1.975 18.387 0.253 9.426 9.214 h 0 c -12.568 12.568 -12.568 32.946 0 45.514 C 14.128 59.857 35.84 76.325 42.901 85.549 z"
                        style={{
                          stroke: 'none',
                          strokeWidth: 1,
                          strokeDasharray: 'none',
                          strokeLinecap: 'butt',
                          strokeLinejoin: 'miter',
                          strokeMiterlimit: 10,
                          fill: 'rgb(0,0,0)',
                          fillRule: 'nonzero',
                          opacity: 1,
                        }}
                        transform=" matrix(1 0 0 1 0 0) "
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
                  54.7K
                </div>
                <div className="amount-command">
                  <img src="/logos/comment.svg" />
                  237
                </div>
                <div onClick={HandleSave} className="amount-save">
                  <svg
                    className="save-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width={256}
                    height={256}
                    viewBox="0 0 256 256"
                    xmlSpace="preserve"
                  >
                    <defs></defs>
                    <g
                      style={{
                        stroke: 'none',
                        strokeWidth: 0,
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: 'none',
                        fillRule: 'nonzero',
                        opacity: 1,
                      }}
                      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                    >
                      <path
                        className={clsx('path-save-svg', { ['path-save-svg-saved']: state.save })}
                        d="M 72.077 89.348 L 48.026 67.961 c -1.725 -1.534 -4.326 -1.534 -6.052 0 L 17.923 89.348 c -1.651 1.468 -4.26 0.296 -4.26 -1.913 V 4.983 C 13.663 2.231 15.894 0 18.646 0 h 52.708 c 2.752 0 4.983 2.231 4.983 4.983 v 82.452 C 76.337 89.644 73.727 90.816 72.077 89.348 z"
                        style={{
                          stroke: 'none',
                          strokeWidth: 1,
                          strokeDasharray: 'none',
                          strokeLinecap: 'butt',
                          strokeLinejoin: 'miter',
                          strokeMiterlimit: 10,
                          fill: 'rgb(0,0,0)',
                          fillRule: 'nonzero',
                          opacity: 1,
                        }}
                        transform=" matrix(1 0 0 1 0 0) "
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
                  34
                </div>
              </div>
              <div className=" tool-shareVideo">
                <img src="/logos/code-dip.svg" />
                <img src="/logos/messenger.svg" />
                <img src="/logos/logo-facebook.svg" />
                <img src="/logos/logo-whatsapp.svg" />
                <img src="/logos/logo-twitter.svg" />
                <img src="/logos/share.png" />
              </div>
            </div>
            <div className="margin-equal linkVideo">
              <span ref={linkVideo}>
                https://www.tiktok.com/@thunoss/video/7239706766164970758?is_from_webapp=1&sender_device=pc&web_id=7198505136262497794
              </span>
              <button onClick={HandleCoppyLink}>Sao chép liên kết</button>
            </div>
          </div>
          <div className="commandsVideo">
            <div className="other-commands">
              <div className="commands">
                <div
                  className="command command01"
                  onMouseEnter={HandleHoverAccuseOpen}
                  onMouseLeave={HandleHoverAccuseClose}
                >
                  <div className="flex-command">
                    <img className="avatar" src="/img-user-upload/avatar01.jpeg" alt="Hán Anh Thư" />
                    <div className="all-infor-command">
                      <div className="name-and-command">
                        <div className="nickName">
                          <b>Phương Nhi</b>
                        </div>
                        <div className="content-command">trân châu phải có đường đen nữa nha em</div>
                      </div>
                      <div className="time-command-btn-reply">
                        <div className="time-command">16 giờ trước</div>
                        <div className="btn-reply">Trả lời</div>
                      </div>
                    </div>
                  </div>
                  <div className="ammount-like">
                    <div
                      onMouseEnter={HandleHoverBtnAccuseOpen}
                      onMouseLeave={HandleHoverBtnAccuseClose}
                      className={clsx('accuse-command', { ['accuse-command-open']: hoverAccuse })}
                    >
                      {btnAccuse ? (
                        <div>
                          <img src="/logos/flag-accuse.svg" /> Báo cáo
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {state.like ? (
                      <svg
                        onClick={HandleLike}
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={256}
                        height={256}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: 'none',
                            strokeWidth: 0,
                            strokeDasharray: 'none',
                            strokeLinecap: 'butt',
                            strokeLinejoin: 'miter',
                            strokeMiterlimit: 10,
                            fill: 'none',
                            fillRule: 'nonzero',
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 42.901 85.549 c 1.059 1.383 3.138 1.383 4.197 0 c 7.061 -9.223 28.773 -25.692 33.475 -30.82 c 12.568 -12.568 12.568 -32.946 0 -45.514 h 0 c -8.961 -8.961 -26.859 -7.239 -34.145 3.1 c -0.699 0.992 -2.158 0.992 -2.857 0 C 36.286 1.975 18.387 0.253 9.426 9.214 h 0 c -12.568 12.568 -12.568 32.946 0 45.514 C 14.128 59.857 35.84 76.325 42.901 85.549 z"
                            style={{
                              stroke: 'none',
                              strokeWidth: 1,
                              strokeDasharray: 'none',
                              strokeLinecap: 'butt',
                              strokeLinejoin: 'miter',
                              strokeMiterlimit: 10,
                              fill: 'red',
                              fillRule: 'nonzero',
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        onClick={HandleLike}
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={256}
                        height={256}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: 'none',
                            strokeWidth: 0,
                            strokeDasharray: 'none',
                            strokeLinecap: 'butt',
                            strokeLinejoin: 'miter',
                            strokeMiterlimit: 10,
                            fill: 'none',
                            fillRule: 'nonzero',
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            className="path-heart-svg"
                            d="M 45 83.769 L 6.653 45.422 C 2.363 41.132 0 35.428 0 29.36 s 2.363 -11.771 6.653 -16.062 c 4.29 -4.291 9.994 -6.653 16.062 -6.653 c 6.068 0 11.772 2.363 16.062 6.653 L 45 19.521 l 6.223 -6.223 c 4.29 -4.291 9.995 -6.653 16.063 -6.653 s 11.771 2.363 16.062 6.653 S 90 23.293 90 29.36 s -2.363 11.771 -6.653 16.062 L 45 83.769 z M 22.715 8.645 c -5.533 0 -10.735 2.155 -14.647 6.067 S 2 23.827 2 29.36 s 2.155 10.735 6.067 14.647 L 45 80.94 l 36.933 -36.933 C 85.845 40.095 88 34.894 88 29.36 s -2.155 -10.735 -6.067 -14.648 C 78.02 10.8 72.817 8.645 67.285 8.645 c -5.533 0 -10.735 2.155 -14.648 6.067 L 45 22.35 l -7.637 -7.637 C 33.45 10.8 28.249 8.645 22.715 8.645 z"
                            style={{
                              stroke: 'none',
                              strokeWidth: 1,
                              strokeDasharray: 'none',
                              strokeLinecap: 'butt',
                              strokeLinejoin: 'miter',
                              strokeMiterlimit: 10,
                              fill: 'rgb(0,0,0)',
                              fillRule: 'nonzero',
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                    )}
                  </div>
                </div>
                <div
                  className="command command02"
                  onMouseEnter={HandleHoverAccuseOpen}
                  onMouseLeave={HandleHoverAccuseClose}
                >
                  <div className="flex-command">
                    <img className="avatar" src="/img-user-upload/avatar01.jpeg" alt="Hán Anh Thư" />
                    <div className="all-infor-command">
                      <div className="name-and-command">
                        <div className="nickName">
                          <b>Phương Nhi</b>
                        </div>
                        <div className="content-command">trân châu phải có đường đen nữa nha em</div>
                      </div>
                      <div className="time-command-btn-reply">
                        <div className="time-command">16 giờ trước</div>
                        <div className="btn-reply">Trả lời</div>
                      </div>
                    </div>
                  </div>
                  <div className="ammount-like">
                    <div
                      onMouseEnter={HandleHoverBtnAccuseOpen}
                      onMouseLeave={HandleHoverBtnAccuseClose}
                      className={clsx('accuse-command', { ['accuse-command-open']: hoverAccuse })}
                    >
                      {btnAccuse ? (
                        <div>
                          <img src="/logos/flag-accuse.svg" /> Báo cáo
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {state.like ? (
                      <svg
                        onClick={HandleLike}
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={256}
                        height={256}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: 'none',
                            strokeWidth: 0,
                            strokeDasharray: 'none',
                            strokeLinecap: 'butt',
                            strokeLinejoin: 'miter',
                            strokeMiterlimit: 10,
                            fill: 'none',
                            fillRule: 'nonzero',
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 42.901 85.549 c 1.059 1.383 3.138 1.383 4.197 0 c 7.061 -9.223 28.773 -25.692 33.475 -30.82 c 12.568 -12.568 12.568 -32.946 0 -45.514 h 0 c -8.961 -8.961 -26.859 -7.239 -34.145 3.1 c -0.699 0.992 -2.158 0.992 -2.857 0 C 36.286 1.975 18.387 0.253 9.426 9.214 h 0 c -12.568 12.568 -12.568 32.946 0 45.514 C 14.128 59.857 35.84 76.325 42.901 85.549 z"
                            style={{
                              stroke: 'none',
                              strokeWidth: 1,
                              strokeDasharray: 'none',
                              strokeLinecap: 'butt',
                              strokeLinejoin: 'miter',
                              strokeMiterlimit: 10,
                              fill: 'red',
                              fillRule: 'nonzero',
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        onClick={HandleLike}
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={256}
                        height={256}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: 'none',
                            strokeWidth: 0,
                            strokeDasharray: 'none',
                            strokeLinecap: 'butt',
                            strokeLinejoin: 'miter',
                            strokeMiterlimit: 10,
                            fill: 'none',
                            fillRule: 'nonzero',
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            className="path-heart-svg"
                            d="M 45 83.769 L 6.653 45.422 C 2.363 41.132 0 35.428 0 29.36 s 2.363 -11.771 6.653 -16.062 c 4.29 -4.291 9.994 -6.653 16.062 -6.653 c 6.068 0 11.772 2.363 16.062 6.653 L 45 19.521 l 6.223 -6.223 c 4.29 -4.291 9.995 -6.653 16.063 -6.653 s 11.771 2.363 16.062 6.653 S 90 23.293 90 29.36 s -2.363 11.771 -6.653 16.062 L 45 83.769 z M 22.715 8.645 c -5.533 0 -10.735 2.155 -14.647 6.067 S 2 23.827 2 29.36 s 2.155 10.735 6.067 14.647 L 45 80.94 l 36.933 -36.933 C 85.845 40.095 88 34.894 88 29.36 s -2.155 -10.735 -6.067 -14.648 C 78.02 10.8 72.817 8.645 67.285 8.645 c -5.533 0 -10.735 2.155 -14.648 6.067 L 45 22.35 l -7.637 -7.637 C 33.45 10.8 28.249 8.645 22.715 8.645 z"
                            style={{
                              stroke: 'none',
                              strokeWidth: 1,
                              strokeDasharray: 'none',
                              strokeLinecap: 'butt',
                              strokeLinejoin: 'miter',
                              strokeMiterlimit: 10,
                              fill: 'rgb(0,0,0)',
                              fillRule: 'nonzero',
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                    )}
                  </div>
                </div>
                <div className="command command03">03</div>
              </div>
            </div>
            <div className="command-from-u">
              <div className={clsx('input-command', { ['input-command-focus']: focusCommand })}>
                <input
                  value={state.command}
                  onChange={HandleChangeCommand}
                  onBlur={() => setFocusCommand(false)}
                  onFocus={() => setFocusCommand(true)}
                  placeholder="Thêm bình luận..."
                  type="text"
                />
                <div>
                  <div
                    arial-label='Dùng ký hiệu "@" để gắn thẻ một người dùng trong bình luận của bạn'
                    className="img-input-command tagUser"
                  ></div>
                  <div arial-label="Nhấp để thêm emoji" className="img-input-command icon"></div>
                </div>
              </div>
              <button disabled={!state.command}>Đăng</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const LayoutDetailVideo = ({ children }) => {
  return <>{children}</>;
};

export default DetailVideo;
