import { mouseoutLayer } from './helper'
import { hideDistance } from './distance'
import { eventDelegate } from './delegate'

export function noteEvents () {
  const notes = document.querySelector('#notes')
  document.querySelector('#show-notes')
    .addEventListener('change', function () {
      const target = this
      notes.style.display = target.checked ? '' : 'none'
    })
  eventDelegate(notes, 'mousemove', '.note', function (event) {
    mouseoutLayer()
    hideDistance()
    const note = this.querySelector('div')
    note.style.display = ''
    if (note.clientWidth > 160) {
      note.style.width = '160px'
      note.style.whiteSpace = 'normal'
    }
    event.stopPropagation()
  })
  notes.addEventListener('mouseout', function (event) {
    notes.querySelectorAll('.note div').forEach(div => {
      div.style.display = 'none'
    }
    )
  })
}
