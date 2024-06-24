import React, { useState } from 'react'
import MatterComp from './page/Matter' // 2d 物理
import HatTrickComp from './page/HatTrick' // js 帽子戏法
import HatTrickGasp from './page/HatTrickGasp' // gasp 帽子戏法
import BackgroundCanvas from './page/BackgroundCanvas' // canvas 底部动画
import Preserve3d from './page/Preserve3d' // 3d 透视
import ThreeScene from './page/ThreeScene' // ThreeScene

function App() {
  return (
    <React.Fragment>
      {/* <MatterComp /> */}
      {/* <HatTrickComp /> */}
      {/* <HatTrickGasp /> */}
      {/* <BackgroundCanvas /> */}
      {/* <Preserve3d /> */}
      <ThreeScene />
    </React.Fragment>
  )
}

export default App
