import React from 'react'
import styles from './index.module.less'

const getXY = (rad: number, l: number) => {
  const x = Math.sin(rad) * l
  const y = Math.cos(rad) * l
  return { x, y }
}

export default function RotateZ() {
  return (
    <div className={styles.rotateZ}>
      <div className="circle">
        {
          new Array(8).fill(null).map((v, i) => (
            <div
              className="seat"
              style={{
                transform: `translate3d(${getXY(360 / 8 * i * Math.PI / 180, 150).x - 25}px, ${getXY(360 / 8 * i * Math.PI / 180, 150).y - 25}px, 0)`
              }}
              key={i}>
              <div className="seat-txt">{i + 1}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
