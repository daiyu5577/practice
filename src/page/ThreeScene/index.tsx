import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'
import * as THREE from 'three'
import { DragControls } from 'three/addons/controls/DragControls.js';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';

interface ThreeBuildProps {
  el: HTMLElement
  config: {
    perspectiveCamera: {
      fov: number
      aspect: number
      near: number
      far: number
    }
    render: {
      width: number
      height: number
    }
  }
  requestAnimationFrameCallBack?: () => void
}

class ThreeBuild {

  config: ThreeBuildProps['config']

  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.Renderer
  requestAnimationFrameCallBack: (() => void) | undefined

  // 是否运行中
  isRuning = true
  // 定时器
  requestAnimationFrameTimer = -1

  constructor(props: ThreeBuildProps) {
    // props
    const { config, el, requestAnimationFrameCallBack } = props
    this.config = config
    this.requestAnimationFrameCallBack = requestAnimationFrameCallBack

    // config
    const { perspectiveCamera, render } = config

    // instance
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(perspectiveCamera.fov, perspectiveCamera.aspect, perspectiveCamera.near, perspectiveCamera.far)
    this.renderer = new THREE.WebGLRenderer()

    // bind
    this.bind()

    this.renderer.setSize(render.width, render.height)
    el.appendChild(this.renderer.domElement)
  }

  bind() {
    this.start = this.start.bind(this)
    this.stop = this.start.bind(this)
    this.restart = this.start.bind(this)
  }

  stop() {
    this.isRuning = false
    cancelAnimationFrame(this.requestAnimationFrameTimer)
  }

  restart() {
    this.isRuning = true
    this.start()
  }

  start() {
    this.renderer.render(this.scene, this.camera)
    this.requestAnimationFrameTimer = requestAnimationFrame(this.start)
    this.requestAnimationFrameCallBack?.()
  }

}

export default function ThreeScene() {

  const threeSceneDOM = useRef<HTMLDivElement>(null)
  const threeBuild = useRef<ThreeBuild>()

  const init = () => {
    // threeBuildInstance
    const threeBuildInstance = new ThreeBuild({
      el: threeSceneDOM.current as HTMLDivElement,
      config: {
        render: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        perspectiveCamera: {
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.01,
          far: 1000
        }
      },
      requestAnimationFrameCallBack() {

      }
    })
    threeBuild.current = threeBuildInstance

    // set common
    threeBuildInstance.camera.position.z = 10
    threeBuildInstance.scene.background = new THREE.Color('#eee')

    // light
    const light = new THREE.DirectionalLight('#1e80ff', 1)
    light.position.set(1, 1, 0)
    threeBuildInstance.scene.add(light)

    // box
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshLambertMaterial({
      color: '#f53f3f',
      emissive: '#f53f3f',
      emissiveIntensity: 0.2
      // wireframe: true
    })
    const cube = new THREE.Mesh(geometry, material)
    threeBuildInstance.scene.add(cube)

    // 拖拽
    // const controls = new DragControls([threeBuildInstance.scene], threeBuildInstance.camera, threeBuildInstance.renderer.domElement);
    // controls.addEventListener('dragstart', function (event) {
    //   event.object.material.emissive.set(0xaaaaaa);
    // });
    // controls.addEventListener('dragend', function (event) {
    //   event.object.material.emissive.set(0x000000);
    // });

    // 弧球控制器(ArcballControls)
    const controls = new ArcballControls(threeBuildInstance.camera, threeBuildInstance.renderer.domElement, threeBuildInstance.scene);
    controls.addEventListener('change', function () {
      // threeBuildInstance.renderer.render(threeBuildInstance.scene, threeBuildInstance.camera);
    });

    // run
    threeBuildInstance.start()
    console.log(threeBuildInstance.scene.children)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className={styles.threeScene} ref={threeSceneDOM}></div>
  )
}
