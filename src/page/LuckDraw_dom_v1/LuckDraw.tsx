import React, { FC, useEffect, useRef, useState } from 'react'
import "./LuckDraw.less"

const list = [1, 2, 3, 4, 5, 6, 7, 8]

interface Props {
  targetIndex: number; // 中奖索引
  turns: number; // 圈数
  speed: number; // 速率
}

// 抽奖方法
function lottery(props: any) {
  const { list = [], targetIndex = 3, turns = 3, speed = 10, step = 6, trackCallback = () => { }, finshCallBack = () => { } } = props
  const len = list.length

  let timer = 0
  let count = -1
  let curIndex = -1
  let time = len * turns * speed + 20

  const interval = () => {
    let t = time
    count = count + 1
    curIndex = count % len
    if (count >= turns * len) {
      if (curIndex === targetIndex) {
        trackCallback({ curIndex, isFinsh: true })
        finshCallBack(curIndex)
        console.log('截止')
        return
      }
    }
    count >= Math.ceil(turns * (len - 1) / 3 * 2) ? t += step * 1.6 : t -= step
    time = t
    trackCallback({ curIndex, isFinsh: false })
    run(t)
  }

  const run = ((st: number) => (time?: number) => {
    timer = setTimeout(interval, time ? time : st)
  })(time)

  return { run }
}

// 抽奖组件
const Component: FC = (props) => {

  const timer = useRef<number>(0)

  const [gift, setGift] = useState(4)
  const [turns, setTurns] = useState<number>(3)
  const [count, setCount] = useState(0)
  const [curIndex, setCurIndex] = useState(-1)

  const [time, setTime] = useState(list.length * turns * 8 + 20)

  const interval = () => {
    console.log('count---', count)
    if (count >= turns * list.length) {
      if (list[count % list.length] === gift) {
        setCurIndex(count % list.length)
        setCount(count)
        clearInterval(timer.current)
        console.log('截止')
        return
      }
    }
    // console.log('time---', time)
    if (count >= Math.ceil(turns * list.length / 3 * 2)) {
      // if (time <= 300) {
      console.log(1)
      setTime(time + 5)
      // }
    } else {
      // if (time > 10) {
      console.log(2)
      setTime(time - 5)
      // }
    }
    setCurIndex(count % list.length)
    setCount(count + 1)
    // clearInterval(timer.current)
  }

  useEffect(() => {
    console.log('定时器-', time)
    timer.current = setInterval(interval, time)
    return () => {
      clearInterval(timer.current)
    }
  }, [time])

  return (
    <div className='luckDraw'>
      {list.map((v, i) => (<div className={`luckDraw-item ${curIndex == i ? 'actived' : ''}`}>{v}</div>))}
    </div>
  )
}
export default Component