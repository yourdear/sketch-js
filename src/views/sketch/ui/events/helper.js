import { state } from '../common'
import { hideDistance } from './distance'

export function getEventTarget (eventNode, event, selector) {
  let current = event.target
  while (current && current !== eventNode) {
    if (current.matches(selector)) return current
    current = current.parentElement
  }
  return undefined
}

export function getIndex (element) {
  return parseInt(element.dataset.index)
}

export function mouseoutLayer () {
  if (document.querySelector('.hover')) {
    document.querySelector('.hover').classList.remove('hover')
  }
  if (document.querySelector('#rulers')) {
    document.querySelector('#rulers').style.display = 'none'
  }
}

export function selectedLayer () {
  if (state.selectedIndex == undefined) return false
  if (document.querySelector('.selected')) {
    document.querySelector('.selected').classList.remove('selected')
  }

  document.querySelector('#layer-' + state.selectedIndex).classList.add('selected');
  (document.querySelector('#rulers')).style.display = 'none'
}

export function removeSelected () {
  if (state.selectedIndex === undefined) return false
  document.querySelector('#layer-' + state.selectedIndex).classList.remove('selected');
  (document.querySelector('#rulers')).style.display = 'none'
  document.querySelector('#inspector').classList.remove('active')
  state.selectedIndex = undefined
  state.tempTargetRect = undefined
  hideDistance()
}

export function scaleSize (length) {
  return Math.round(length / state.scale * 10) / 10
}

export function getIntersection (a, b) {
  const x1 = Math.max(a.x, b.x)
  const y1 = Math.max(a.y, b.y)
  const x2 = Math.min(a.x + a.width, b.x + b.width)
  const y2 = Math.min(a.y + a.height, b.y + b.height)
  const width = x2 - x1
  const height = y2 - y1
  if (width <= 0 || height <= 0) {
    // no intersection
    return undefined
  }
  return {
    x: x1,
    y: y1,
    width: width,
    height: height
  }
}

export function clickElement (element) {
  const e = document.createEvent('MouseEvents')
  e.initEvent('click', true, true)
  element.dispatchEvent(e)
}
