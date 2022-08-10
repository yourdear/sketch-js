<template>
  <div>
   <div id="sketch">11111111</div>
  <aside class="inspector" id="inspector">
    <!-- <div class="header-right"><div id="unit" class="unit-box" tabindex="0">XHDPI @2x (dp/sp)</div></div> -->
    <div  id="inspectorCenter"></div>
  </aside>
  </div>
</template>

<script>
import { render } from './ui/render'
import { jsondata } from './data'
export default {
  mounted () {
    const {
      innerHTML,
      init,
      zoom,
      // unit,
      artboards,
      slices,
      colors,
      events,
      navigateByURLHash,
      state,
      allAtlasMethod
    } = render()
    init(jsondata)
    state.zoom = 0.5
    document.querySelector('#sketch').innerHTML = innerHTML
    zoom()
    // unit()
    artboards()
    slices()
    colors()
    events()
    navigateByURLHash(false)
    allAtlasMethod()
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', () => {}, false)
    document.body.removeEventListener('mousemove', function bodymouseMove () {}, false)
  }
}
</script>
<style lang='less'>
  @import './ui/static/meaxure.css';
</style>
