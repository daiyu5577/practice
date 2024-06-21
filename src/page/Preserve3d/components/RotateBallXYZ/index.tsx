import React from 'react'
import styles from './index.module.less'

const getBallPostion = (deg: number, radius: number, needNum: number) => {
  const getRad = (deg: number) => deg * Math.PI / 180 // 角度转弧度
  const averageAngle = 360 / needNum // 平均角度

  // 若转换坐标系 z 轴向上、则该点为 z 坐标
  // 不转换坐标系 z 轴垂直屏幕，实现球面坐标、则该点为 y 坐标
  const vRad = getRad(deg) // 垂直弧度
  const y = Math.floor(radius * Math.sin(vRad))

  const ShadowHypotenuse = radius * Math.cos(vRad) // 平面投影斜边

  const postionArr = []

  for (let i = 0; i < needNum; i++) {
    const x = Math.floor(ShadowHypotenuse * Math.cos(getRad(i * averageAngle)))
    const z = Math.floor(ShadowHypotenuse * Math.sin(getRad(i * averageAngle)))
    postionArr.push({ x, y, z })
  }
  return postionArr
}

const layer_1 = getBallPostion(-20, 60, 8)
const layer_2 = getBallPostion(0, 40, 16)
const layer_3 = getBallPostion(45, 50, 12)

// 球面坐标计算

export default function RotateBallXY() {
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
                  transform: `translate3d(${v.x}px, ${v.y}px, ${v.z}px)`
                }}
              ></div>
            ))
          }
          {
            layer_2.map((v, i, t) => (
              <div
                key={i}
                className="item"
                style={{
                  transform: `translate3d(${v.x}px, ${v.y}px, ${v.z}px)`
                }}
              ></div>
            ))
          }
          {
            layer_3.map((v, i, t) => (
              <div
                key={i}
                className="item"
                style={{
                  transform: `translate3d(${v.x}px, ${v.y}px, ${v.z}px)`
                }}
              ></div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
