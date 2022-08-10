// import { eventDelegate } from './delegate'

// export function tabEvents () {
//   const tab = document.querySelector('.header-left .tab')
//   const navbar = document.querySelector('.navbar')
//   const showBtn = document.querySelector('.showBtn')
//   eventDelegate(tab, 'click', 'li', function (event) {
//     const current = tab.querySelector('.current')
//     if (this === current) {
//       // this.classList.remove('current');
//       showBtnNav(false)
//       return
//     }
//     if (current) {
//       current.classList.remove('current')
//     }
//     const id = this.dataset.id
//     this.classList.add('current')
//     showBtnNav(true)
//     navbar.querySelectorAll('section').forEach(sec => {
//       sec.style.display = 'none'
//     }
//     );
//     (navbar.querySelector('#' + id)).style.display = ''
//   })

//   showBtn.addEventListener('click', function (event) {
//     const on = navbar.classList.contains('on')
//     if (on) {
//       showBtnNav(false)
//     } else {
//       showBtnNav(true)
//     }
//   })
// }

// export function hideNavBar () {
//   const tab = document.querySelector('.header-left .tab')
//   if (tab.querySelector('.current')) {
//     tab.querySelector('.current').classList.remove('current')
//   }

//   showBtnNav(false)
// }
// export function showNavBar () {
//   const tab = document.querySelector('.icon-artboards')
//   tab.classList.add('current')
//   showBtnNav(true)
// }

// export function showBtnNav (even) {
//   const navbar = document.querySelector('.navbar')
//   const showBtn = document.querySelector('.showBtn')
//   if (even) {
//     navbar.classList.add('on')
//     showBtn.style.backgroundPositionY = ''
//   } else {
//     navbar.classList.remove('on')
//     showBtn.style.backgroundPositionY = 'top'
//   }
// }
