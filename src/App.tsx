import React, { useState } from 'react'
import MatterComp from './page/Matter' // 2d 物理
import HatTrickComp from './page/HatTrick' // js 帽子戏法
import HatTrickGasp from './page/HatTrickGasp' // gasp 帽子戏法
import BackgroundCanvas from './page/BackgroundCanvas' // canvas 底部动画

function App() {
  return (
    <React.Fragment>
      {/* <MatterComp /> */}
      {/* <HatTrickComp /> */}
      {/* <HatTrickGasp /> */}
      <BackgroundCanvas />
    </React.Fragment>
  )
}

export default App
