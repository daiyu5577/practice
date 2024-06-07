import React, { useEffect, useState, useRef } from 'react'
import styles from './index.module.less'

const defList = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
]
type defListItem = typeof defList[number]

const getRandom = (params: { exclude: number[], district: [number, number] }) => {
  const { exclude, district } = params
  const [min, max] = district
  let num: number = -1
  while (num == -1 || exclude.includes(num)) {
    const left = max - min
    num = left == max ? Math.floor(Math.random() * max) : Math.floor(Math.random() * left + min)
  }
  return num
}

export default function HatTrick() {

  const hatItemsDOM = useRef<HTMLDivElement[]>([])
  const animationTimes = useRef(1)

  const [list, setList] = useState(defList)
  const [winId, setWinId] = useState<number>()

  const handleStart = () => {
    const curWinId = getRandom({ exclude: [], district: [1, list.length + 1] })
    setWinId(curWinId)

    // 放入物体动画
    setTimeout(() => {
      startAnimation(curWinId)
    }, 1100);
  }

  const startAnimation = (winId: number) => {

    const duration = 400

    const curWinId = winId
    const curWinDom = hatItemsDOM.current.find(v => v.dataset.id == `${curWinId}`)
    const targetId = getRandom({ exclude: [curWinId], district: [1, list.length + 1] })
    const targetDom = hatItemsDOM.current.find(v => v.dataset.id == `${targetId}`)

    // 记录原始位置
    let recordCurWinDomPostionId = Number(curWinDom!.dataset!.postion)
    let recordTargetDomPostionId = Number(targetDom!.dataset!.postion)

    // 升起
    const animationUp = () => {
      curWinDom!.style.transform = `translate3D(${(Number(recordCurWinDomPostionId) - 1) * 100}%, -10px, 0)`
      targetDom!.style.transform = `translate3D(${(Number(recordTargetDomPostionId) - 1) * 100}%, -10px, 0)`
      animationExchangePostion()
    }

    // 交换位置
    const animationExchangePostion = () => {
      setTimeout(() => {
        curWinDom!.style.transform = `translate3D(${(Number(recordTargetDomPostionId) - 1) * 100}%, -10px, 0)`
        curWinDom!.style.left = `${recordTargetDomPostionId * 0.8}%`

        targetDom!.style.transform = `translate3D(${(Number(recordCurWinDomPostionId) - 1) * 100}%, -10px, 0)`
        targetDom!.style.left = `${recordCurWinDomPostionId * 0.8}%`

        curWinDom!.dataset!.postion = `${recordTargetDomPostionId}`
        targetDom!.dataset!.postion = `${recordCurWinDomPostionId}`

        animationDown()
      }, duration);
    }

    // 降落
    const animationDown = () => {
      setTimeout(() => {
        let recordCurWinDomPostionId = Number(curWinDom!.dataset!.postion)
        let recordTargetDomPostionId = Number(targetDom!.dataset!.postion)
        curWinDom!.style.transform = `translate3D(${(Number(recordCurWinDomPostionId) - 1) * 100}%, 0px, 0)`
        targetDom!.style.transform = `translate3D(${(Number(recordTargetDomPostionId) - 1) * 100}%, 0px, 0)`
        if (animationTimes.current >= 3) {
          animationTimes.current = 1
          return
        }
        animationTimes.current += 1
        startAnimation(winId)
      }, duration);
    }

    animationUp()
  }

  // 选择罐子
  const handleChoose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!winId) return
    const target = e.currentTarget
    target.classList.add('choosed')
    if (Number(target.dataset.id) == winId) {
      alert('猜对了')
    } else {
      alert('猜错了')
    }
    setTimeout(() => {
      target.classList.remove('choosed')
      setWinId(undefined)
    }, 1000);
  }


  return (
    <div className={styles.hatTrick}>
      <div className="list">
        {
          list.map((v, i) => (
            <div className={`list-item ${winId == v.id ? 'actived' : ''}`}
              data-id={v.id}
              data-postion={v.id}
              ref={(e) => {
                if (!!e && !hatItemsDOM.current.includes(e as HTMLDivElement)) {
                  hatItemsDOM.current.push(e as HTMLDivElement)
                }
              }}
              onClick={handleChoose}
              key={i}
            >
              <div className="item-cnt flex-xyc">{v.id}</div>
              <div className="item-goods"></div>
            </div>
          ))
        }
      </div>
      <div className="btns">
        <div onClick={handleStart} className="btn-start flex-xyc">开始</div>
      </div>
    </div>
  )
}
