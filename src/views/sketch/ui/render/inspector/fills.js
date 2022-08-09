import { localize } from '../../common'
import { colorItem, propertyType } from './shared'
export function renderFills (layerData) {
  if (!layerData.fills || !layerData.fills.length) { return '' }
  const fills = []
  const fillsData = layerData.fills
  for (let i = fillsData.length - 1; i >= 0; i--) {
    const fill = fillsData[i]
    fills.push('<div class="item items-group" data-label="' + localize(fill.fillType) + ':">')
    if (fill.fillType.toLowerCase() == 'color') {
      fills.push(colorItem(fill.color))
    } else {
      fills.push('<div class="gradient">')
      fill.gradient.colorStops.forEach(gradient => fills.push(colorItem(gradient.color)))
      fills.push('</div>')
    }
    fills.push('</div>')
  }
  return propertyType('FILLS', fills.join(''))
}
