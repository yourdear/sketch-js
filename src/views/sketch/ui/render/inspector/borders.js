
import { localize } from '../../common'
import { unitSize } from '../helper'
import { colorItem, propertyType } from './shared'
function renderBorders (layerData) {
  if (!layerData.borders || !layerData.borders.length) { return '' }
  const borders = []
  for (let i = layerData.borders.length - 1; i >= 0; i--) {
    const border = layerData.borders[i]
    borders.push('<div class="items-group">', '<h4>' + localize(border.position + ' Border') + '</h4>', '<div class="item" data-label="' + localize('Weight') + '">', '<label><input id="font-family" type="text" value="' + unitSize(border.thickness) + '" readonly="readonly"></label>', '<label></label>', '</div>')
    borders.push('<div class="item" data-label="' + localize(border.fillType) + '">')
    if (border.fillType.toLowerCase() == 'color') {
      borders.push(colorItem(border.color))
    } else {
      borders.push('<div class="colors gradient">')
      border.gradient.colorStops.forEach(gradient => borders.push(colorItem(gradient.color)))
      borders.push('</div>')
    }
    borders.push('</div>')
    borders.push('</div>')
  }
  return propertyType('BORDERS', borders.join(''))
}
export {
  renderBorders
}
