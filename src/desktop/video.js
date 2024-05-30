import {forwardRef, useRef, useImperativeHandle} from 'react'
import video01 from "../../public/videos/01.mp4"

function Video(props,ref){
  const videoRef = useRef()
  useImperativeHandle(ref,()=>({
    play(){
    videoRef.current.play()
    },
    pause(){
      videoRef.current.pause()
    }
  }))
  return(
    <>
    <video ref={videoRef} src={video01} width="300px" />
    </>
  )
}
export default forwardRef(Video)