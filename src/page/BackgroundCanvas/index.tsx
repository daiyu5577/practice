import React, { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './index.module.less'

import lightIcon from './images/light.png'

const staticImages = [lightIcon]

class CanvasDraw {

  canvasDOM: HTMLCanvasElement
  ctx2d: CanvasRenderingContext2D
  sources: string[]
  imageDOMArr: HTMLImageElement[]
  graphStackArr: {
    x: number
    y: number
    img: HTMLImageElement
  }[]

  maxStack = 30

  constructor(canvasDOM: HTMLCanvasElement, sources: string[]) {
    this.canvasDOM = canvasDOM
    this.ctx2d = canvasDOM.getContext('2d') as CanvasRenderingContext2D
    this.sources = sources
    this.imageDOMArr = [] // 图片加载资源
    this.graphStackArr = [] // 图形栈
    this.init()
  }

  // 初始化
  init() {
    this.loadSources()
  }

  // 加载资源
  loadSources() {
    this.sources.forEach(v => {
      const img = new Image()
      img.onload = (e) => {
        this.imageDOMArr.push(img)
        if (this.imageDOMArr.length >= this.sources.length) {
          this.run()
        }
      }
      img.src = v
    })
  }

  // 创建图形
  creatGraph() {
    const curImgIndex = Math.floor(Math.random() * (this.imageDOMArr.length) + 1)
    return {
      x: Math.floor(Math.random() * this.canvasDOM.width),
      y: Math.floor(Math.random() * this.canvasDOM.height),
      img: this.imageDOMArr[curImgIndex]
    }
  }

  // 绘制
  draw() { }

  // 运行
  run() {
    setInterval(() => {
      if (!(this.graphStackArr.length >= this.maxStack)) {
        this.graphStackArr.push(this.creatGraph())
      }
    }, 1000)
  }

}

export default function BackgroundCanvas() {

  const winScreen = useRef(window.screen)
  const canvasDOM = useRef<HTMLCanvasElement>(null)
  const ctx2d = useRef<CanvasRenderingContext2D>()

  // 图片资源
  const imageDOMArr = useRef<HTMLImageElement[]>([])

  // 加载资源
  const init = (sources: string[]) => {
    sources.forEach(v => {
      const img = new Image()
      img.onload = (e) => {
        imageDOMArr.current.push(img)
        if (imageDOMArr.current.length >= sources.length) run()
      }
      img.src = v
    })
  }

  // 运行
  const run = () => {
    const ctx = canvasDOM.current?.getContext('2d')
  }

  // 创建图形对象
  const creatImgObj = () => {

  }

  useEffect(() => {
    ctx2d.current = canvasDOM.current!.getContext('2d') as CanvasRenderingContext2D
    init(staticImages)
  }, [])

  return (
    <React.Fragment>
      {
        createPortal(
          <div className={styles.backgroundCanvas}>
            <canvas
              ref={canvasDOM}
              width={winScreen.current.width}
              height={winScreen.current.height}
            />
          </div>,
          document.body
        ) as React.ReactNode
      }
    </React.Fragment>

  )
}
