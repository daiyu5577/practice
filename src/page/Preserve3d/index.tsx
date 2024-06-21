import React from 'react'
import RotateZ from './components/RotateZ' // 分割圆、Y轴旋转
import RotateBallTranslateZ from './components/RotateBallTranslateZ' // ball
import RotateBallXY from './components/RotateBallXY' // ball
import styles from './index.module.less'

export default function Preserve3d() {
  return (
    <div className={styles.preserve3d}>
      {/* <RotateZ /> */}
      {/* <RotateBallTranslateZ /> */}
      <RotateBallXY />
    </div>
  )
}
