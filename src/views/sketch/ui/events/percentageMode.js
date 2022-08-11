// 选中layer点击alt键出现百分比
export function percentageModeEvents () {
  window.addEventListener('keydown', event => {
    if (event.which !== 18) return
    if (document.getElementById('screen')) {
      document.getElementById('screen').classList.add('percentage-mode')
    }
    event.preventDefault()
  })
  window.addEventListener('keyup', event => {
    if (event.which !== 18) return
    if (document.getElementById('screen')) {
      document.getElementById('screen').classList.remove('percentage-mode')
    }
    event.preventDefault()
  })
}
