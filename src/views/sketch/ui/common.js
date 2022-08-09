const state = {
  zoom: 0.5,
  unit: 'px',
  scale: 1,
  artboardIndex: undefined,
  colorFormat: 'color-hex',
  current: undefined,
  codeType: 'css'
}
let I18N = {}
const langs = navigator.language.toLocaleLowerCase()
const timestamp = new Date().getTime()
function localize(str) {
  var lang = langs === 'zh' ? 'zh-cn' : langs
  return (I18N[lang] && I18N[lang][str]) ? I18N[lang][str] : str
}
let project = {}
function init(data) {
  state.current = undefined
  state.tempTargetRect = undefined
  state.artboardIndex = undefined
  state.scale = 1
  state.colorFormat = data.colorFormat
  state.unit = data.unit
  I18N = data.languages || {}
  project = data
}

export {
  state,
  I18N,
  langs,
  timestamp,
  project,
  localize,
  init
}
