import { project, state, localize } from '../common'
import { layers, MapArtboardIDToIndex } from '../render/layers'
// import { notes } from '../render/notes'
import { message } from '../render/helper'
import { updateScreen } from '../render/screen'
import { flowMode, setFlowMode } from './flow'
import { removeSelected } from './helper'
import { setShouldBackToAnother } from './hashChange'

export function gotoArtboard (para, updateHash = true) {
  setShouldBackToAnother(false)
  let index
  if (typeof para === 'number') {
    index = para
  } else {
    index = MapArtboardIDToIndex[para]
    if (index < 0) {
      message(localize('Target artboard not exported.'))
      return
    }
  }
  if (state.artboardIndex == index) return
  // clear flows animation before switch
  const flows = document.querySelector('#flows')
  flows.classList.remove('show-flows')
  removeSelected()
  state.artboardIndex = index
  state.selectedIndex = undefined
  state.current = project.artboards[state.artboardIndex]
  updateScreen(true)
  layers()
  // notes()
  document.querySelectorAll('.active').forEach(e => e.classList.remove('active'))
  if (document.querySelector('#artboard-' + index)) {
    document.querySelector('#artboard-' + index).classList.add('active')
  }
  if (document.querySelector('#startpoint-' + index)) {
    document.querySelector('#startpoint-' + index).classList.add('active')
  }
  if (updateHash) updateURLHash()
  document.title = state.current.name + ' - Sketch MeaXure'
}

export function navigateByURLHash (updateHash = true) {
  const setting = parseURLHash()
  gotoArtboard(setting.artboardIndex, false)
  if (flowMode !== setting.flowMode) {
    setFlowMode(setting.flowMode)
  }
  if (updateHash) updateURLHash()
}

export function updateURLHash () {
  const hash = getURLHash()
  if (window.location.hash == hash) return
  window.location.hash = hash
}

export function historyBackUntilAnotherArtboard () {
  setShouldBackToAnother(true)
  history.back()
}

export function getURLHash () {
  return `#${flowMode ? 'p' : 's'}${state.artboardIndex}`
}

export function parseURLHash () {
  const result = {
    flowMode: false,
    artboardIndex: 0
  }
  /**
     *  #[s|p][index]
      s: specification mode
      p: prototype mode
      index: artboard index
     */
  const hash = window.location.hash
  result.flowMode = hash.substr(1, 1) === 'p'
  let index = Number(hash.substr(1))
  if (isNaN(index)) index = Number(hash.substr(2))
  if (isNaN(index)) index = 0
  result.artboardIndex = index
  return result
}
