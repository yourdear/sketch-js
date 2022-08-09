import { propertyType } from './shared'
export function renderExportable (layerData) {
  if (!layerData.exportable || !layerData.exportable.length) { return '' }
  const expHTML = []
  expHTML.push('<ul class="exportable">')
  layerData.exportable.forEach(exportable => {
    const filePath = exportable.path
    expHTML.push('<li>', '<a href="' + filePath +
        '"target="_blank" download ' +
        'data-format="' + exportable.format.toUpperCase() +
        '"><img class="dragExp" src="' + filePath + '" alt="' + exportable.path +
        '"><img class="thumbExp" src="' + filePath + '" alt="' + exportable.path +
        '">' +
        exportable.name.split('/').at(-1) +
        '</a>', '</li>')
  })
  expHTML.push('</ul>')
  if (document.location.protocol == 'file:') {
    expHTML.push('按(option)或(alt)点击即可下载')
  }
  return propertyType('EXPORTABLE', expHTML.join(''))
}
