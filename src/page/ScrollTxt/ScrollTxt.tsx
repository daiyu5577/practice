import React, { FC, useEffect, useRef, useState } from 'react'

const styles = {
  'scrollWrap': {
    width: "100%",
    overflow: "hidden"
  },
  'item': {
    // paddingRight: '10px',
    display: 'inline-block'
  }
}

interface Props {
  children: React.ReactNode;
  duration?: number
}
const ScrollTxt: FC<Props> = (props) => {

  const { duration = 3 } = props

  const scrollWrapDOM = useRef<HTMLDivElement>(null)
  const scrollDOM = useRef<HTMLDivElement>(null)
  const itemDOM = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<any[]>([])

  const startWidth = useRef(0)


  useEffect(() => {

    const scrollWrapWidth = scrollWrapDOM.current?.offsetWidth || 0
    const itemWidth = itemDOM.current?.offsetWidth || 0
    if (startWidth.current === 0) {
      startWidth.current = itemWidth
    }

    // count scroll items
    let cloneNum = 0
    if (itemWidth >= scrollWrapWidth) {
      cloneNum = 1
    } else {
      cloneNum = Math.ceil(scrollWrapWidth / itemWidth)
    }
    const items = new Array(cloneNum).fill(null) as HTMLDivElement[]
    setItems(items)

    // add handler
    const transitionend = () => {
      scrollDOM.current!.style!.transition = ``
      scrollDOM.current!.style!.transform = `translateX(-0px)`
      setTimeout(animation, 10)
    }
    scrollDOM.current?.addEventListener('transitionend', transitionend)

    
    // star animation
    function animation() {
      try {
        const curWidth = itemDOM.current?.offsetWidth || 0
        const t = curWidth === startWidth.current ? duration : duration * curWidth / startWidth.current
        scrollDOM.current!.style!.transition = `all ${t}s linear`
        scrollDOM.current!.style!.transform = `translateX(-${curWidth}px)`
      } catch (error) {
        console.log(error)
      }
    }
    animation()

    return () => {
      scrollDOM.current?.removeEventListener('transitionend', transitionend)
    }
  }, [props.children])

  return (
    <div ref={scrollWrapDOM} style={styles.scrollWrap}>
      <div ref={scrollDOM}>
        <div ref={itemDOM} style={styles.item}>{props.children}</div>
        {items.map((v, i) => (<div style={styles.item} key={i}>{props.children}</div>))}
      </div>
    </div>
  )
}
export default ScrollTxt