import React from 'react'
import RotatePlanCircle from './components/RotatePlanCircle' // 分割圆、Y轴旋转
import RotateBallTranslateZ from './components/RotateBallTranslateZ' // ball
import RotateBallXYZ from './components/RotateBallXYZ' // ball
import styles from './index.module.less'

export default function Preserve3d() {
  return (
    <div className={styles.preserve3d}>
      {/* <RotatePlanCircle /> */}
      {/* <RotateBallTranslateZ /> */}
      <RotateBallXYZ />
    </div>
  )
}
