
interface Option {
  el: HTMLDivElement
  images: string[]
  frame: number
  onEnd?: () => void
}

export default class VideoPlayer {

  static timer: number

  // option
  readonly el;
  readonly elWidth: number;
  readonly elHeight: number;
  readonly images;
  readonly frame;
  readonly onEnd;

  // custom
  loadImages: HTMLImageElement[];
  canvasDOM: HTMLCanvasElement;
  currentFrame: number;

  constructor(props: Option) {
    if (!props.el) {
      throw Error('el is not defind')
    }

    // option
    this.el = props.el
    this.elWidth = this.el.offsetWidth
    this.elHeight = this.el.offsetHeight
    this.images = props.images
    this.frame = props.frame
    this.onEnd = props.onEnd || (() => void (0));

    // custom
    this.loadImages = []
    this.canvasDOM = document.createElement('canvas')
    this.currentFrame = 0
    this.init()
  }

  init() {
    this.loadImages = this.images.map(v => {
      const imgDOM = document.createElement('img')
      imgDOM.src = v
      return imgDOM
    })
    this.canvasDOM.width = this.elWidth || 0
    this.canvasDOM.height = this.elHeight || 0
    this.el.appendChild(this.canvasDOM)
  }

  play() {
    const ctx = this.canvasDOM.getContext('2d')
    VideoPlayer.timer = setInterval(() => {
      if (this.currentFrame >= this.loadImages.length) {
        clearInterval(VideoPlayer.timer)
        this.currentFrame = 0
        this.onEnd()
        return
      }
      let curImg = this.loadImages[this.currentFrame]
      if (curImg.complete) {
        ctx?.clearRect(0, 0, this.elWidth, this.elHeight)
        ctx?.drawImage(curImg, 0, 0, this.elWidth, this.elHeight)
        this.currentFrame += 1
      }
      curImg.onload = (e) => {
        ctx?.clearRect(0, 0, this.elWidth, this.elHeight)
        ctx?.drawImage(curImg, 0, 0, this.elWidth, this.elHeight)
        this.currentFrame += 1
      }
    }, 1000 / this.frame)
  }

  pause() {
    clearInterval(VideoPlayer.timer)
  }
}
