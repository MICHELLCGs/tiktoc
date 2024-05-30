// import { useRef } from 'react';
// import { useEventContext } from './hooks';

// // const [state, dispatch] = useEventContext();
// // const idVideo = useRef();
// let clickTimer = null;

// const handleClickVideo = () => {
//   // luôn luôn được gọi trong lần đầu tiền click
//   if (!clickTimer) {
//     clickTimer = setTimeout(() => {
//       HandlePlayVideo();
//       console.log('play pause');
//       clearTimeout(clickTimer);
//       clickTimer = null;
//     }, 200);

//     return;
//   }
//   // click lần thứ hai trong thời gian 200ms thì sẽ nhảy xuống đây
//   dispatch({ type: 'like', payload: true });
//   console.log('i liked video');
//   clearTimeout(clickTimer);
//   clickTimer = null;
// };

// function HandlePlayVideo() {
//   if (state.statusVideo) {
//     idVideo.current.pause();
//     // setStatusVideo(!statusVideo);
//     dispatch({ type: 'statusVideo' });
//     return;
//   }
//   idVideo.current.play();
//   dispatch({ type: 'statusVideo' });
// }

// export default { HandlePlayVideo, handleClickVideo };
