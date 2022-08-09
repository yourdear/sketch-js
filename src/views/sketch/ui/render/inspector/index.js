import { state } from '../../common'
import { renderCodeTemplate } from './codeTemplate'
import { renderProperties } from './properties'
import { renderShadows } from './shadows'
import { renderBorders } from './borders'
import { renderFont } from './font'
import { renderExportable } from './exportable'
import { renderFills } from './fills'

export function inspector () {
  if (state.selectedIndex === undefined ||
        (!state.current && !state.current.layers && !state.current.layers[state.selectedIndex])
  ) return false
  const layerData = state.current.layers[state.selectedIndex]
  const html = [
    '<h2>' + layerData.name + '</h2>',
    renderProperties(layerData),
    renderFills(layerData),
    renderFont(layerData),
    renderBorders(layerData),
    renderShadows(layerData),
    renderCodeTemplate(layerData),
    renderExportable(layerData)
  ]
  const inspector = document.querySelector('#inspector')
  const inspectorCenter = document.querySelector('#inspectorCenter')
  inspector.classList.add('active')
  inspectorCenter.innerHTML = html.join('')

  // select previously used tab
  const li = inspector.querySelector('[data-codeType=' + state.codeType + ']')
  if (li) {
    li.classList.add('select')
    inspector.querySelector('#' + li.getAttribute('data-id')).classList.add('select')
  }
  document.querySelectorAll('#code-tab li').forEach(
    li => li.addEventListener('click', function () {
      const target = this
      const id = target.getAttribute('data-id')
      state.codeType = target.getAttribute('data-codeType')
      target.parentElement.querySelector('li.select').classList.remove('select')
      target.classList.add('select')
      if (inspector.querySelector('div.item.select')) {
        inspector.querySelector('div.item.select').classList.remove('select')
      }
      inspector.querySelector('#' + id).classList.add('select')
    })
  )
}
