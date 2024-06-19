import React from 'react'
import RotateZ from './components/RotateZ' // 分割圆、Y轴旋转
import styles from './index.module.less'

export default function Preserve3d() {
  return (
    <div className={styles.preserve3d}>
      <RotateZ />
    </div>
  )
}
