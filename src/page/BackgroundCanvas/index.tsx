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
    targetX: number
    targetY: number
    img: HTMLImageElement
  }[]

  maxStack = 30
  timer = 0

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
    this.bindFn()
    this.loadSources()
  }

  // 绑定
  bindFn() {
    this.run = this.run.bind(this)
  }

  // 加载资源
  loadSources() {
    this.sources.forEach(v => {
      const img = new Image()
      img.onload = () => {
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
      y: Math.floor(this.canvasDOM.height + Math.random() * 20),
      targetX: Math.floor(Math.random() * this.canvasDOM.width),
      targetY: Math.floor(Math.random() * this.canvasDOM.height),
      img: this.imageDOMArr[curImgIndex - 1]
    }
  }

  // 检测绘制完成的图
  checkGraphStackArr() {
    for (let i = this.graphStackArr.length - 1; i >= 0; i--) {
      const graphItem = this.graphStackArr[i];
      if (graphItem.y <= graphItem.targetY) {
        this.graphStackArr.splice(i, 1)
      }
    }
    if (!(this.graphStackArr.length >= this.maxStack)) {
      this.graphStackArr.push(this.creatGraph())
    }
  }

  // 绘制
  draw() {
    this.ctx2d.clearRect(0, 0, this.canvasDOM.width, this.canvasDOM.height)
    this.graphStackArr.forEach((v) => {
      this.ctx2d.beginPath()
      v.x < v.targetX ? v.x += 1 : v.x -= 1
      v.y > v.targetY && (v.y -= 1)
      this.ctx2d.drawImage(v.img, v.x, v.y, v.img.width, v.img.height)
      // this.ctx2d.fillStyle = '#000'
      // this.ctx2d.fillRect(v.x, v.y, 10, 10)
    })
  }

  // 运行
  run() {
    this.timer = setInterval(() => {
      this.checkGraphStackArr()
      this.draw()
    }, 1000 / 40)
    // requestAnimationFrame(this.run)
  }

  // 销毁
  destroy() {
    clearInterval(this.timer)
  }
}

export default function BackgroundCanvas() {

  const winScreen = useRef(window.screen)
  const canvasDOM = useRef<HTMLCanvasElement>(null)
  const canvasDraw = useRef<CanvasDraw>()

  useEffect(() => {
    const instance = new CanvasDraw(canvasDOM.current as HTMLCanvasElement, staticImages)
    canvasDraw.current = instance
    return () => instance.destroy()
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
