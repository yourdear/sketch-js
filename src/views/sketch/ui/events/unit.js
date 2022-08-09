import { state } from '../common'
import { layers } from '../render/layers'
import { inspector } from '../render/inspector'
import { slices } from '../render/slices'
import { eventDelegate } from './delegate'

export function unitEvents () {
  const unit = document.querySelector('#unit')
  eventDelegate(unit, 'change', 'input[name=resolution]', function (event) {
    const checked = unit.querySelector('input[name=resolution]:checked')
    state.unit = checked.dataset.unit
    state.scale = Number(checked.dataset.scale)
    layers()
    inspector()
    unit.blur()
    unit.querySelector('p').innerText = checked.dataset.name
    slices()
  })
  eventDelegate(unit, 'click', 'h3, .overlay', function (event) {
    unit.blur()
  })
}
