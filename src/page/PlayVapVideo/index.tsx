import React, { useEffect, useRef, useState } from 'react'
import json from './demo.json'
import Vap from 'video-animation-player'

import styles from './index.module.less'

interface Props {
  src: string
  poster: string
}

export default function PlayVideo() {

  const videoWrapDom = useRef<HTMLDivElement>(null)
  const vapVM = useRef<any>(null)

  const [isShow, setIsShow] = useState(false)
  const [videoInfo, setVideoInfo] = useState({
    src: '',
    poster: ''
  })

  const onCanPlay = () => {
    const vap = new Vap({
      container: videoWrapDom.current,
      src: videoInfo.src,
      width: window.screen.width,
      // height: window.screen.height,
      mute: true,
      loop: true,
      accurate: true,
      config: json,
      onLoadError() {
        console.log('vap loading fail')
      }
    })
    vapVM.current = vap
  }

  const handleClose = () => {
    setIsShow(false)
  }

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
    if (!isShow || !videoWrapDom.current) return
    onCanPlay()
  }, [isShow])

  return (
    <React.Fragment>
      {
        isShow &&
        <div onClick={handleClose} className={styles.playVideo}>
          <div ref={videoWrapDom} className="videoWrap"></div>
        </div >
      }
    </React.Fragment>
  )
}

PlayVideo.show = (props: Props) => { }
PlayVideo.hiden = () => { }
