import { state } from '../common'
import { getIndex, mouseoutLayer, selectedLayer, removeSelected, getEventTarget } from './helper'
import { inspector } from '../render/inspector'
import { distance, hideDistance } from './distance'
import { panMode } from './panMode'

export function layerEvents() {
  document.body.addEventListener('click', function(event) {
    if (panMode) return
    if (getEventTarget(document.body, event, 'header, #inspector, .navbar')) {
      event.stopPropagation()
      return
    }
    const target = event.target
    if (target.classList.contains('layer') || target.classList.contains('slice-layer')) {
      var selected = (!target.classList.contains('slice-layer'))
        ? target
        : document.querySelector('.layer-' + target.dataset.objectid)
      state.selectedIndex = getIndex(selected)
      hideDistance()
      mouseoutLayer()
      selectedLayer()
      inspector()
      return
    }
    removeSelected()
  })
  document.body.addEventListener('mousemove', function(event) {
    if (panMode) return
    mouseoutLayer()
    hideDistance()
    const target = event.target
    if (target.classList.contains('screen-viewer') || target.classList.contains('screen-viewer-inner')) {
      state.tempTargetRect = getEdgeRect(event)
      state.targetIndex = undefined
      distance()
    } else if (target.classList.contains('layer')) {
      state.targetIndex = getIndex(event.target)
      state.tempTargetRect = undefined
      mouseoverLayer()
      distance()
    } else {
      state.tempTargetRect = undefined
    }
  })
}
function mouseoverLayer() {
  if (state.targetIndex && state.selectedIndex == state.targetIndex) return false
  var target = document.querySelector('#layer-' + state.targetIndex)
  target.classList.add('hover')
  const rv = (document.querySelector('#rv'))
  rv.style.left = target.offsetLeft + 'px'
  rv.style.width = target.offsetWidth + 'px'
  const rh = (document.querySelector('#rh'))
  rh.style.top = target.offsetTop + 'px'
  rh.style.height = target.offsetHeight + 'px';
  (document.querySelector('#rulers')).style.display = ''
}

function getEdgeRect(event) {
  const screen = document.querySelector('#screen')
  const rect = screen.getBoundingClientRect()
  let x = (event.pageX - rect.left) / state.zoom
  let y = (event.pageY - rect.top) / state.zoom
  let width = 10
  let height = 10
  const xScope = (x >= 0 && x <= state.current.width)
  const yScope = (y >= 0 && y <= state.current.height)
  // left and top
  if (x <= 0 && y <= 0) {
    x = -10
    y = -10
  } else if (x >= state.current.width && y <= 0) { // right and top
    x = state.current.width
    y = -10
  } else if (x >= state.current.width && y >= state.current.height) { // right and bottom
    x = state.current.width
    y = state.current.height
  } else if (x <= 0 && y >= state.current.height) { // left and bottom
    x = -10
    y = state.current.height
  } else if (y <= 0 && xScope) { // top
    x = 0
    y = -10
    width = state.current.width
  } else if (x >= state.current.width && yScope) { // right
    x = state.current.width
    y = 0
    height = state.current.height
  } else if (y >= state.current.height && xScope) { // bottom
    x = 0
    y = state.current.height
    width = state.current.width
  } else if (x <= 0 && yScope) { // left
    x = -10
    y = 0
    height = state.current.height
  }
  if (xScope && yScope) {
    x = 0
    y = 0
    width = state.current.width
    height = state.current.height
  }
  return {
    x: x,
    y: y,
    width: width,
    height: height
  }
}
