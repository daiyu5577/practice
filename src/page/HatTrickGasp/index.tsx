import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
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

    let tl = gsap.timeline({
      onComplete() {
        startAnimation(curWinId)
      }
    });

    tl
      .to(`.item-cnt-${curWinId}`, {
        rotate: '-25deg',
        duration: 0.8,
      })
      .fromTo(`.item-goods-${curWinId}`,
        {
          opacity: 0,
          transform: 'translateX(-50%) scale(1)',
          bottom: '-100px'
        },
        {
          opacity: 1,
          transform: 'translateX(-50%) scale(0.8)',
          bottom: '1px',
          display: 'block',
          duration: 0.6,
        })
      .to(`.item-cnt-${curWinId}`, {
        rotate: '0deg',
        duration: 0.8,
      })
      .to(`.item-goods-${curWinId}`, {
        transform: 'translateX(-50%) scale(1)',
        duration: 0.1,
      })
  }

  const startAnimation = (winId: number) => {

    const curWinId = winId
    const curWinDom = hatItemsDOM.current.find(v => v.dataset.id == `${curWinId}`)
    const targetId = getRandom({ exclude: [curWinId], district: [1, list.length + 1] })
    const targetDom = hatItemsDOM.current.find(v => v.dataset.id == `${targetId}`)

    // 记录原始位置
    let recordCurWinDomPostionId = Number(curWinDom!.dataset!.postion)
    let recordTargetDomPostionId = Number(targetDom!.dataset!.postion)

    const tl = gsap.timeline()

    tl
      // 升起
      .to(
        `.list-item-${curWinId}`,
        {
          duration: 0.3,
          transform: `translate3D(${(Number(recordCurWinDomPostionId) - 1) * 100}%, -10px, 0)`
        },
        '0'
      )
      .to(
        `.list-item-${targetId}`,
        {
          duration: 0.3,
          transform: `translate3D(${(Number(recordTargetDomPostionId) - 1) * 100}%, -10px, 0)`,
        },
        '0'
      )
      // 交换位置
      .to(
        `.list-item-${curWinId}`,
        {
          duration: 0.3,
          transform: `translate3D(${(Number(recordTargetDomPostionId) - 1) * 100}%, -10px, 0)`,
          left: `${recordTargetDomPostionId * 0.8}%`
        },
        '0.3'
      )
      .to(
        `.list-item-${targetId}`,
        {
          duration: 0.3,
          transform: `translate3D(${(Number(recordCurWinDomPostionId) - 1) * 100}%, -10px, 0)`,
          left: `${recordCurWinDomPostionId * 0.8}%`,
          onComplete() {
            curWinDom!.dataset!.postion = `${recordTargetDomPostionId}`
            targetDom!.dataset!.postion = `${recordCurWinDomPostionId}`
          }
        },
        '0.3'
      )
      // 降落
      .to(
        `.list-item-${curWinId}`,
        {
          duration: 0.3,
          transform: `translate3D(${(Number(recordTargetDomPostionId) - 1) * 100}%, 0px, 0)`,
        },
        '0.6'
      )
      .to(
        `.list-item-${targetId}`,
        {
          duration: 0.3,
          transform: `translate3D(${(Number(recordCurWinDomPostionId) - 1) * 100}%, 0px, 0)`,
          onComplete() {
            if (animationTimes.current >= 3) {
              animationTimes.current = 1
              return
            }
            animationTimes.current += 1
            startAnimation(winId)
          }
        },
        '0.6'
      )
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
            <div className={`list-item list-item-${v.id} ${winId == v.id ? 'actived' : ''}`}
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
              <div className={`item-cnt flex-xyc item-cnt-${v.id}`}>{v.id}</div>
              <div className={`item-goods item-goods-${v.id}`}></div>
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
