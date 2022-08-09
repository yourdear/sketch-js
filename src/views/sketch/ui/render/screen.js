import { state, timestamp } from '../common'
import { zoomSize } from './helper'
import { flowMode } from '../events/flow'

export function updateScreen(resetScroll) {
  const imageData = (state.current.imageBase64) ? state.current.imageBase64 : state.current.imagePath + '?' + timestamp
  const screen = document.querySelector('#screen')
  const viewerInner = screen.parentElement
  const viewer = document.querySelector('.screen-viewer')

  screen.style.width = zoomSize(state.current.width) + 'px'
  screen.style.height = zoomSize(state.current.height) + 'px'
  screen.style.background = '#FFF url(' + imageData + ') no-repeat'
  screen.style.backgroundSize = zoomSize(state.current.width) + 'px ' + zoomSize(state.current.height) + 'px'
  // viewer size
  const maxSize = Math.max(state.current.width, state.current.height, viewer.clientWidth, viewer.clientHeight) * 5
  if (flowMode) {
    viewerInner.style.width = zoomSize(state.current.width) + 'px'
    viewerInner.style.height = zoomSize(state.current.height) + 'px'
    screen.style.marginLeft = '0'
    screen.style.marginTop = '0'
    viewer.scrollTop = 0
    return
  } else {
    viewerInner.style.width = maxSize + 'px'
    viewerInner.style.height = maxSize + 'px'
    screen.style.marginLeft = -zoomSize(state.current.width / 2) + 'px'
    screen.style.marginTop = -zoomSize(state.current.height / 2) + 'px'
  }
  // set scroll
  if (resetScroll) {
    viewer.scrollLeft = flowMode ? 0 : (maxSize - viewer.clientWidth) / 2
    const suitHight = screen.clientHeight > viewer.clientHeight ? screen.clientHeight : viewer.clientHeight
    viewer.scrollTop = flowMode ? 0 : (maxSize - suitHight) / 2
  }
}
