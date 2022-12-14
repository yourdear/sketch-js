import { state, localize, project } from '../../common'

export function colorItem (color) {
  let colorName = (project.colorNames) ? project.colorNames[color['argb-hex']] : ''
  colorName = (colorName) ? ' data-name="' + colorName + '"' : ''
  return [
    '<div class="color"' + colorName + '>',
    '<label><em><i style="background-color:' + color['css-rgba'] + ';"></i></em></label><input data-color="' + encodeURI(JSON.stringify(color)) + '" type="text" value="' + color[state.colorFormat] + '" readonly="readonly">',
    '</div>'
  ].join('')
}
export function propertyType (title, content, isCode) {
  const nopadding = isCode ? ' style="padding:0"' : ''
  const iscodeDiv = isCode
    ? `<div class="code-title">
    <h3 class="inline-h3">${localize(title)}</h3>
    <div class="copyAll">复制代码</div>
  </div>`
    : `<h3>${localize(title)}</h3>`
  return ['<section>',
    iscodeDiv,
    '<div class="context"' + nopadding + '>',
    content,
    '</div>',
    '</section>'
  ].join('')
}
