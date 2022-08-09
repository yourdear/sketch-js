import { gotoArtboard, updateURLHash, historyBackUntilAnotherArtboard } from './navigate'
import { getEventTarget, removeSelected } from './helper'
import { updateScreen } from '../render/screen'
import { hideNavBar, showNavBar } from './tab'
import { alignElement, Edge } from './alignElement'

export var flowMode = undefined

export function flowEvents () {
  flowModeSwitchEvents()
  flowClickEvents()
}

function flowClickEvents () {
  const flows = document.querySelector('#flows')
  flows.addEventListener('click', function (event) {
    removeSelected()
    hideNavBar()
    const target = getEventTarget(flows, event, '.flow')
    if (!target) {
      flows.classList.remove('show-flows')
      setTimeout(() => {
        flows.classList.add('show-flows')
      }, 0)
      event.stopPropagation()
      return
    }
    const id = target.dataset.flowTarget
    if (id == 'back') {
      historyBackUntilAnotherArtboard()
    } else {
      gotoArtboard(id)
    }
    event.stopPropagation()
  })
}

function flowModeSwitchEvents () {
  document.querySelector('#flow-mode').addEventListener('change', function () {
    setFlowMode((this).checked)
    updateURLHash()
  })
}

export function setFlowMode (enabled) {
  flowMode = enabled
  const viewer = document.querySelector('.screen-viewer')
  const screen = document.querySelector('#screen')
  const currentRect = screen.getBoundingClientRect()
  const inputFlowMode = document.querySelector('#flow-mode')
  // set checked won't trigge change event
  inputFlowMode.checked = enabled
  const hideOnFLow = [
    '#layers',
    '#unit',
    '.header-left [data-id="slices"]',
    '.header-left [data-id="colors"]',
    '.header-right',
    '#artboards .flow-starts'
  ]
  const showOnFlow = [
    '#flows',
    '#artboards .flow-starts'
  ]
  const hideOnFLowDisplay = flowMode ? 'none' : ''
  const showOnFLowDisplay = flowMode ? '' : 'none'
  hideOnFLow.forEach(s => {
    const el = document.querySelector(s)
    if (el) el.style.display = hideOnFLowDisplay
  })
  showOnFlow.forEach(s => {
    const el = document.querySelector(s)
    if (el) el.style.display = showOnFLowDisplay
  })
  if (flowMode) {
    screen.classList.add('flow')
    removeSelected()
    hideNavBar()
  } else {
    screen.classList.remove('flow')
    showNavBar()
  }
  updateScreen()
  alignElement({
    scroller: viewer,
    target: screen,
    toRect: currentRect,
    fromEdge: Edge.hcenter | Edge.vtop,
    toEdge: Edge.hcenter | Edge.vtop
  })
}
