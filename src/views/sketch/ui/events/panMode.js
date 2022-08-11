import { mouseoutLayer } from './helper'
import { hideDistance } from './distance'

// export var panMode = false
// 鼠标左键点击移动设计稿
export function panModeEvents () {
  let moving = false
  let moveData
  const screen = document.querySelector('#screen')
  screen.addEventListener('keydown', event => {
    if (event.which !== 32) return
    document.getElementById('cursor').style.display = ''
    document.querySelector('.screen-viewer').classList.add('moving-screen')
    mouseoutLayer()
    hideDistance()
    // panMode = true
    event.preventDefault()
  })
  screen.addEventListener('keyup', event => {
    if (event.which !== 32) return
    document.getElementById('cursor').style.display = 'none'
    document.getElementById('cursor').classList.remove('moving')
    document.querySelector('.screen-viewer').classList.remove('moving-screen')
    // panMode = false
    moving = false
    event.preventDefault()
  })
  screen.addEventListener('mousemove', event => {
    const cursor = document.getElementById('cursor')
    if (cursor) {
      cursor.style.left = event.clientX + 'px'
      cursor.style.top = event.clientY + 'px'
    }
    if (!moving) return
    const viewer = document.querySelector('.screen-viewer')
    viewer.scrollLeft = (moveData.x - event.clientX) + moveData.scrollLeft
    viewer.scrollTop = (moveData.y - event.clientY) + moveData.scrollTop
    event.preventDefault()
  })
  screen.addEventListener('mousedown', event => {
    // if (!panMode) return
    const cursor = document.getElementById('cursor')
    const viewer = document.querySelector('.screen-viewer')
    cursor.classList.add('moving')
    moveData = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: viewer.scrollLeft,
      scrollTop: viewer.scrollTop
    }
    moving = true
    event.preventDefault()
  })
  screen.addEventListener('mouseup', event => {
    // if (!panMode || !moving) return
    if (!moving) return
    const cursor = document.getElementById('cursor')
    const viewer = document.querySelector('.screen-viewer')
    viewer.classList.remove('moving-screen')
    cursor.classList.remove('moving')
    moving = false
    event.preventDefault()
  })
}
