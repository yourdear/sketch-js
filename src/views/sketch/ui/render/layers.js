import { state, project } from '../common'
import { zoomSize, percentageSize, unitSize } from './helper'
import { SMType } from '../meaxure/enum'

export var MapArtboardIDToIndex
export function layers () {
  specLayers()
  flowLayers()
}

function specLayers () {
  const layersHTML = []
  state.current.layers.forEach((layer, index) => {
    if (layer.type == SMType.group || layer.type == SMType.hotspot) return
    const x = zoomSize(layer.rect.x)
    const y = zoomSize(layer.rect.y)
    const width = zoomSize(layer.rect.width)
    const height = zoomSize(layer.rect.height)
    const classNames = ['layer']
    const rotation = layer.rotation
    classNames.push('layer-' + layer.objectID)
    if (state.selectedIndex == index) classNames.push('selected')
    layersHTML.push([`
<div id="layer-${index}" 
    class="${classNames.join(' ')}" data-index="${index}" 
    percentage-width="${percentageSize(layer.rect.width, state.current.width)}" 
    percentage-height="${percentageSize(layer.rect.height, state.current.height)}" 
    data-width="${unitSize(layer.rect.width)}" 
    data-height="${unitSize(layer.rect.height)}" 
    style="left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px; transform: rotate(${rotation}deg);"
>
    <i class="tl"></i><i class="tr"></i><i class="bl"></i><i class="br"></i>
    <b class="et h"></b><b class="er v"></b><b class="eb h"></b><b class="el v"></b>
</div>`].join(''))
  })
  document.querySelector('#layers').innerHTML = layersHTML.join('')
}

function flowLayers () {
  MapArtboardIDToIndex = project.artboards.reduce((p, c, i) => {
    p[c.objectID] = i
    return p
  }, { back: -1 })
  const layersHTML = []
  state.current.layers.filter(layer => layer.flow && MapArtboardIDToIndex[layer.flow.targetId] !== undefined)
    .forEach((layer, index) => {
      const x = zoomSize(layer.rect.x)
      const y = zoomSize(layer.rect.y)
      const width = zoomSize(layer.rect.width)
      const height = zoomSize(layer.rect.height)
      const classNames = ['flow']
      layersHTML.push([`
<div class="${classNames.join(' ')}"
    data-flow-target="${layer.flow.targetId}"
    style="left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px;"
></div>`].join(''))
    })
  document.querySelector('#flows').innerHTML = layersHTML.join('')
}
