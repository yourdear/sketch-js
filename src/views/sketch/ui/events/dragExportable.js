import { eventDelegate } from './delegate'

export function dragExportableEvents() {
  eventDelegate(document.body, 'dragstart', '.exportable .dragExp', function(event) {
    this.style.width = 'auto'
    this.style.height = 'auto'
    const rect = this.getBoundingClientRect()
    const left = event.pageX - rect.left - this.offsetWidth / 2
    const top = event.pageY - rect.top - this.offsetHeight / 2
    this.style.left = left + 'px'
    this.style.top = top + 'px'
  })
  eventDelegate(document.body, 'dragend', '.exportable .dragExp', function(event) {
    this.style.left = ''
    this.style.top = ''
    this.style.width = ''
    this.style.height = ''
  })
}
