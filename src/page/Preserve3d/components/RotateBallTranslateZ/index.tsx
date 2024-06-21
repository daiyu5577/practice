import React from 'react'
import styles from './index.module.less'

const getXY = (rad: number, l: number) => {
  const x = Math.sin(rad) * l
  const y = Math.cos(rad) * l
  return { x, y }
}

const layer_1 = new Array(6).fill(1)

// 通过 translateZ 进行位移

export default function RotateZ() {
  return (
    <div className={styles.rotateZ}>
      <div className="box">
        <div className="boxCenter">
          {
            layer_1.map((v, i, t) => (
              <div
                key={i}
                className="item"
                style={{
                  transform: `rotateY(${i * (360 / t.length)}deg) translate3d(0, 0, 60px)`
                }}
              ></div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
