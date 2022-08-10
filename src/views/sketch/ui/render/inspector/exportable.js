import { propertyType } from './shared'
export function renderExportable (layerData) {
  if (!layerData.exportable || !layerData.exportable.length) { return '' }
  const expHTML = []
  expHTML.push('<ul class="exportable">')
  layerData.exportable.forEach(exportable => {
    const filePath = exportable.path
    expHTML.push('<li>', '<a imgPath="' + filePath +
        '"href="javascript:void(0);" class="slice-a" ' +
        'data-format="' + exportable.format.toUpperCase() +
        '"><img class="dragExp" src="' + filePath + '" alt="' + exportable.path +
        '"><img class="thumbExp" src="' + filePath + '" alt="' + exportable.path +
        '">' +
        exportable.name.split('/').at(-1) +
        '</a>', '</li>')
  })
  expHTML.push('<li class="load-current-li">',
    '<button class="load-current-button">下载当前切图</button>',
    '</li>',
    '<li class="load-all-li">',
    '<button class="load-all-button">查看所有切图</button>',
    '</li>'
  )
  expHTML.push('</ul>')
  if (document.location.protocol === 'file:') {
    expHTML.push('按(option)或(alt)点击即可下载')
  }
  // 切图下载
  setTimeout(() => {
    const loadCurrent = document.querySelector('.load-current-button')
    loadCurrent.addEventListener('click', (event) => {
      const sliceLi = document.querySelector('.slice-a')
      const imgPath = sliceLi.attributes.imgPath.nodeValue
      console.log(imgPath)
      const a = document.createElement('a')
      a.setAttribute('href', imgPath)
      a.setAttribute('download', 'download')
      a.setAttribute('target', '_blank')
      const clickEvent = document.createEvent('MouseEvents')
      clickEvent.initEvent('click', true, true)
      a.dispatchEvent(clickEvent)
      document.removeChild(a)
    })
  }, 0)
  return propertyType('EXPORTABLE', expHTML.join(''))
}
