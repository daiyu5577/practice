import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'

// images
import video_def_poster from './images/video_def_poster.png'

interface Props {
  src: string
  poster: string
}

export default function PlayVideo() {

  const videoDOM = useRef<HTMLVideoElement>(null)

  const [isShow, setIsShow] = useState(false)
  const [isShowLoading, setIsShowLoading] = useState(true)
  const [videoInfo, setVideoInfo] = useState({
    src: '',
    poster: ''
  })

  const onCanPlay = () => {
    setIsShowLoading(false)
    // const videoTarget = videoDOM.current
    // const screenWidth = window.screen.width
    // if (!videoDOM) return
    // const w = videoTarget!.videoWidth
    // const h = videoTarget!.videoHeight
    // videoTarget!.style.height = screenWidth / w * h + 'px'
  }

  const handleClose = () => {
    setIsShow(false)
  }

  useEffect(() => {
    if (!isShow) {
      setIsShowLoading(true)
    }
  }, [isShow])

  useEffect(() => {
    PlayVideo.show = (v: Props) => {
      setVideoInfo(v)
      setIsShow(true)
    }
    PlayVideo.hiden = () => {
      setIsShow(false)
    }
  }, [])

  useEffect(() => {
    if (!isShow || !videoDOM.current) return
    videoDOM.current.oncanplay = onCanPlay
  }, [isShow])

  return (
    <React.Fragment>
      {
        isShow &&
        <div onClick={handleClose} className={styles.playVideo}>
          <div className="playVideo-cnt">
            <video
              ref={videoDOM}
              autoPlay
              loop
              data-object-fit
              muted
              x5-playsinline="true"
              playsInline
              webkit-playsinline="true"
              x-webkit-airplay="true"
              preload="auto"
              x5-video-player-type="h5"
              className='giftVideo'
              poster={video_def_poster}
            // poster={videoInfo.poster}
            >
              <source src={videoInfo.src} type="video/mp4"></source>
            </video>
          </div>
          {isShowLoading && <div className="video-loading"></div>}
        </div >
      }
    </React.Fragment>
  )
}

PlayVideo.show = (props: Props) => { }
PlayVideo.hiden = () => { }
