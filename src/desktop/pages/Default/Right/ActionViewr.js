import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { useEventContext } from '../../../Context/hooks';

const ActionViewer = () => {
  const [state, dispatch] = useEventContext();
  const navigate = useNavigate();

  function HandleLike() {
    // set State and check with clsx
    dispatch({ type: 'like' });
    dispatch({ type: 'animationDots' });
    setTimeout(() => dispatch({ type: 'animationDots' }), 1000);
  }

  const HandleRedirectToComment = () => {
    navigate('/user-id/video/id-video');
  };
  return (
    <>
      <div className="res-user-video">
        <div className="btn-like" onClick={HandleLike}>
          <div className="father-heart">
            {state.like && state.animationDots ? (
              <>
                <div className="dots-inside">
                  <div className="inside"></div>
                </div>
                <div className="dots-outside">
                  <div className="outside"></div>
                </div>
              </>
            ) : (
              ''
            )}
            <div>
              <svg
                className="heart-svg heart-svg-home-page"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="25"
                height="25"
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
            </div>
          </div>
        </div>
        <div className="ammount-like" title="like">
          500
        </div>
        <div className="btn-comment">
          <img onClick={HandleRedirectToComment} src="/logos/comment.svg" alt="comment" />
        </div>
        <div className="ammount-comment" title="comment">
          10
        </div>
        <div className="btn-shared">
          <img src="/logos/share.png" alt="share" />
        </div>
        <div className="ammount-share" title="share">
          1
        </div>
      </div>
      ;
    </>
  );
};

export default ActionViewer;
