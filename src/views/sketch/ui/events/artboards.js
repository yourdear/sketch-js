// import { getIndex } from './helper'
// import { eventDelegate } from './delegate'
// import { gotoArtboard } from './navigate'

// export function artboardsEvents () {
//   const artboardsList = document.querySelector('#artboards')
//   eventDelegate(artboardsList, 'click', '.artboard', function (event) {
//     const index = getIndex(this)
//     gotoArtboard(index)
//   })
//   eventDelegate(artboardsList, 'change', 'input[name=page]', function (event) {
//     const pObjectID = (document.querySelector('.page-list input[name=page]:checked')).value
//     document.querySelector('.pages-select h3')
//       .innerHTML = this.parentElement.querySelector('span').innerHTML
//     document.querySelectorAll('.artboard-list li').forEach((li) => {
//       if (pObjectID == 'all' || li.getAttribute('data-page-id') == pObjectID) {
//         li.style.display = ''
//       } else {
//         li.style.display = 'none'
//       }
//     });
//     (document.querySelector('.pages-select')).blur()
//     event.stopPropagation()
//   })
// }
