import { state } from '../common'
import { updateScreen } from '../render/screen'
import { layers } from '../render/layers'
import { notes } from '../render/notes'
import { zoom as updateZoomControls } from '../render/zoom'
import { hideDistance } from './distance'
import { eventDelegate } from './delegate'
import { alignElement, Edge } from './alignElement'

export function zoomEvents() {
  const zoomer = document.querySelector('#zoom')
  eventDelegate(zoomer, 'click', '.zoom-in:not(disabled), .zoom-out:not(disabled)', function(event) {
    if (this.classList.contains('zoom-in')) {
      zoomRender(state.zoom - 0.25)
    } else {
      zoomRender(state.zoom + 0.25)
    }
    event.stopPropagation()
  })
  document.querySelector('.zoom-text').addEventListener('click', function(event) {
    zoomRender(1)
  })
}

export function zoomRender(val) {
  state.targetIndex = undefined;
  (document.querySelector('#rulers')).style.display = 'none'
  hideDistance()
  const viewer = document.querySelector('.screen-viewer')
  const screen = document.querySelector('#screen')
  const currentRect = screen.getBoundingClientRect()
  const screenPoint = screenPointOnViewerCenter(viewer, screen)
  const screenPoint2 = {
    x: screenPoint.x * val / state.zoom,
    y: screenPoint.y * val / state.zoom
  }
  state.zoom = val
  updateZoomControls()
  updateScreen()
  alignElement({
    scroller: viewer,
    target: screen,
    toRect: currentRect,
    fromEdge: Edge.hleft | Edge.vtop,
    toEdge: Edge.hleft | Edge.vtop
  })
  viewer.scrollLeft += screenPoint2.x - screenPoint.x
  viewer.scrollTop += screenPoint2.y - screenPoint.y
  document.querySelectorAll('#layers, #notes').forEach(e => e.innerHTML = '')
  setTimeout(function() {
    layers()
    notes()
  }, 150)
}

function screenPointOnViewerCenter(viewer, screen) {
  const viewerRect = viewer.getBoundingClientRect()
  const screenRect = screen.getBoundingClientRect()
  const viewerCenter = {
    x: viewerRect.x + viewerRect.width / 2,
    y: viewerRect.y + viewerRect.height / 2
  }
  return {
    x: viewerCenter.x - screenRect.x,
    y: viewerCenter.y - screenRect.y
  }
}
