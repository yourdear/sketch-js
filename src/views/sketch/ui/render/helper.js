import { project, state } from '../common'

export function zoomSize (size) {
  return size * state.zoom / project.resolution
}

export function percentageSize (size, size2) {
  return (Math.round(size / size2 * 1000) / 10) + '%'
}

export function unitSize (value, isText) {
  // logic point
  const pt = value / project.resolution
  // convert to display value
  const sz = Math.round(pt * state.scale * 100) / 100
  const units = state.unit.split('/')
  let unit = units[0]
  if (units.length > 1 && isText) {
    unit = units[1]
  }
  return sz + unit
}
export function unitCss (value) {
  const fontSize = /^font-size:/
  const borderRadius = /^border-radius:/
  const border = /^border:/
  const boxShadow = /^box-shadow:/
  const width = /^width:/
  const height = /^height:/
  const lineHeight = /^line-height:/
  const layerData = state.current.layers[state.selectedIndex]
  return value.map(item => {
    if (fontSize.test(item)) {
      return 'font-size: ' + unitCssName(item)
    }
    if (width.test(item)) {
      return 'width: ' + unitWidthHeight(layerData, 'width')
    }
    if (height.test(item)) {
      return 'height: ' + unitWidthHeight(layerData, 'height')
    }
    if (lineHeight.test(item)) {
      return 'line-height: ' + unitCssName(item)
    }
    if (borderRadius.test(item)) {
      return 'border-radius: ' + unitBorderRadius(layerData.radius, item)
    }
    if (border.test(item)) {
      return unitBorder(layerData, item)
    }
    if (boxShadow.test(item)) {
      return unitBoxShadow(layerData, item)
    }
    return item
  })
}

function unitCssName (name) {
  const p = name.replace(/[^\d.]/g, '')
  const pt = p / project.resolution
  const sz = Math.round(pt * state.scale * 100) / 100
  const units = state.unit.split('/')
  const unit = units[0]
  return sz + unit + ';'
}
// unit BorderRadius
export function unitBorderRadius (layerDataRadius, name) {
  if (layerDataRadius) {
    return unitProperBorderRadius(layerDataRadius)
  } else {
    const e = /\d+(.\d+)?/g
    const l = name.match(e)
    if (l.length === 1) {
      return unitCssName(name)
    } else {
      return unitProperBorderRadius(l)
    }
  }
}
function unitProperBorderRadius (name) {
  const Radius = []
  for (let i = 0; i < name.length; i++) {
    Radius.push(unitSize(name[i]))
  }
  return Radius.join(' ') + ';'
}
// unit Width height
function unitWidthHeight (layerData, value) {
  const results = value == 'width' ? unitSize(layerData.rect.width) : unitSize(layerData.rect.height)
  return results + ';'
}

// border
function unitBorder (layerData, e) {
  const borders = []
  if (layerData.borders != undefined) {
    for (let i = layerData.borders.length - 1; i >= 0; i--) {
      const border = layerData.borders[i]
      borders.push('border: ' + unitSize(border.thickness) + ' solid ' + border.color['css-rgba'] + ';')
    }
    return borders.join('')
  } else {
    return e
  }
}
// Box-Shadow
function unitBoxShadow (layerData, e) {
  const shadows = []
  if (layerData.shadows) {
    for (let i = layerData.shadows.length - 1; i >= 0; i--) {
      const shadow = layerData.shadows[i]
      const type = shadow.type == 'Inner' ? 'inset ' : ''
      shadows.push('box-shadow: ' + type + unitSize(shadow.offsetX) + ' ' + unitSize(shadow.offsetY) + ' ' + unitSize(shadow.blurRadius) + ' ' + unitSize(shadow.spread) + ' ', shadow.color['css-rgba'] + ';')
    }
    return shadows.join('')
  } else {
    return e
  }
}

let msgTimeout
export function message (msg) {
  const message = document.querySelector('#message')
  message.innerText = msg
  message.style.display = 'inherit'
  if (msgTimeout) {
    clearTimeout(msgTimeout)
    msgTimeout = undefined
  }
  msgTimeout = setTimeout(() => {
    message.style.display = 'none'
  }, 1000)
}
