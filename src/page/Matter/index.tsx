import React, { useEffect, useRef } from 'react'
import { Engine, Render, Runner, Bodies, Composite, Composites, Bounds, Constraint, Body, Query, World } from 'matter-js'
import * as Matter from 'matter-js'
import styles from './index.module.less'

export default function MatterComp() {

  const docWidth = useRef(document.documentElement.offsetWidth)
  const docHeight = useRef(document.documentElement.offsetHeight)

  const mainDOM = useRef<HTMLDivElement>(null)
  const renderRef = useRef<Render>()
  const engineRef = useRef<Engine>()

  // body
  const moveBallRef = useRef<Constraint>()

  // 原点障碍物
  const creatBarrierList = () => {

    const radius = 10

    const carrierConf = [
      {
        col: 9,
        row: 1,
        colGap: 80,
        rowGap: 0,
        xx: 0,
        yy: 150
      },
      {
        col: 8,
        row: 1,
        colGap: 80,
        rowGap: 0,
        xx: 0,
        yy: 250
      },
      {
        col: 9,
        row: 1,
        colGap: 70,
        rowGap: 0,
        xx: 0,
        yy: 350
      },
      {
        col: 8,
        row: 1,
        colGap: 90,
        rowGap: 0,
        xx: 0,
        yy: 450
      },
      {
        col: 9,
        row: 1,
        colGap: 90,
        rowGap: 0,
        xx: 0,
        yy: 550
      },
    ]

    // 计算对称偏移 x
    carrierConf.forEach(v => {
      v.xx = (docWidth.current - radius * 2 * v.col - v.colGap * (v.col - 1)) / 2
    })

    return carrierConf.map((v, i) => {
      return Composites.stack(v.xx, v.yy, v.col, v.row, v.colGap, v.rowGap, function (x: number, y: number) {
        return Bodies.circle(x, y, radius, {
          isStatic: true,
          friction: 1,
          render: {
            fillStyle: '#f5c130',
          }
        });
      })
    })
  }

  // 围挡
  const creatWall = () => {
    const bottomWall = Bodies.rectangle(docWidth.current / 2, docHeight.current - 30, docWidth.current, 60, { isStatic: true, render: { fillStyle: '#eeeeee' } });
    const leftWall = Bodies.rectangle(5, docHeight.current / 2, 10, docHeight.current, { isStatic: true, render: { fillStyle: '#eeeeee' } });
    const rightWall = Bodies.rectangle(docWidth.current - 5, docHeight.current / 2, 10, docHeight.current, { isStatic: true, render: { fillStyle: '#eeeeee' } });
    return [bottomWall, leftWall, rightWall]
  }

  // 球块链接
  const creatMoveBall = () => {
    const moveBar = Bodies.rectangle(400, 20, 200, 30, {
      isStatic: true,
      render: {
        fillStyle: '#1e80ff'
      }
    })
    const ball = Bodies.circle(300, 100, 30, {
      render: {
        fillStyle: '#75ff1e'
      }
    })
    const moveBarConstraint = Constraint.create({
      label: 'moveBall',
      bodyA: moveBar,
      bodyB: ball,
      length: 100
    })
    let moveStep = 2
    setInterval(() => {
      if (moveBar.position.x >= docWidth.current - 100 || moveBar.position.x - 100 <= 0) {
        moveStep *= -1
      }
      Body.setPosition(moveBar, {
        x: moveBar.position.x + moveStep,
        y: 20
      })
    }, 1000 / 60)
    moveBallRef.current = moveBarConstraint
    return [moveBar, ball, moveBarConstraint]
  }

  const init = () => {
    // create an engine
    const engine = Engine.create();
    engineRef.current = engine
    // create a renderer
    const render = Render.create({
      element: mainDOM.current as HTMLDivElement,
      engine: engine,
      options: {
        width: docWidth.current,
        height: docHeight.current,
        hasBounds: true,
        wireframes: false,
        background: '#6f428f',
        showPositions: true,
      }
    });
    renderRef.current = render


    // create two boxes and a ground
    const boxA = Bodies.circle(Math.random() * 400 + 400, 80, 30, {
      friction: 1,
      torque: (Math.random() * 1 + 1) * (Math.random() > 0.5 ? 1 : -1)
    });

    // creatBarrierList
    const barrierList = creatBarrierList()
    // creatWall
    const wallList = creatWall()
    // creatMoveBall
    const moveBall = creatMoveBall()

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, ...moveBall, ...wallList, ...barrierList]);

    // run the renderer
    Render.run(render);
    // create runner
    const runner = Runner.create();
    // run the engine
    Runner.run(runner, engine);

    // 暂停
    // Runner.stop(runner)
    // setTimeout(() => {
    //   Runner.start(runner, engine)
    // }, 1000);
  }


  useEffect(() => {
    // 初始化
    init()
    // 绑定事件
    mainDOM.current?.addEventListener('click', () => {
      Composite.remove(engineRef.current!.world, moveBallRef.current as Constraint)
      setTimeout(() => {
        Composite.add(engineRef.current!.world!, moveBallRef.current as Constraint)
      }, 4000);
    })
  }, [])

  return (
    <div className={styles.matter} ref={mainDOM}></div>
  )
}
