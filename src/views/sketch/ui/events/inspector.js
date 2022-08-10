import { state } from '../common'
import { colors } from '../render/colors'
import { eventDelegate } from './delegate'
import { message } from '../render/helper'
import $ from '../static/jquery'
export function inspectorEvents () {
  const formats = ['color-hex', 'argb-hex', 'css-rgba', 'css-hsla', 'ui-color']
  const inspector = document.querySelector('#inspector')
  eventDelegate(inspector, 'click', '.color label', function (event) {
    const current = formats.indexOf(state.colorFormat)
    const next = (current + 1) % formats.length
    state.colorFormat = formats[next]
    document.querySelectorAll('.color input').forEach((i) => {
      const colors = JSON.parse(decodeURI(i.dataset.color))
      i.value = colors[state.colorFormat]
    })
    colors()
  })
  eventDelegate(inspector, 'dblclick', 'input, textarea', function (event) {
    this.select()
  })

  // 复制代码
  function copy (id) {
    const center = $(id)
    center.select()
    document.execCommand('copy')
  }
  $('.inspector').mousedown(function () {
    $('.copyAll').click(function () {
      copy('#css-panel #css')
      message('复制成功')
    })
  })
}
