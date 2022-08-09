import { clickElement } from './helper'
import { message } from '../render/helper'
import { localize } from '../common'
import { eventDelegate } from './delegate'

export function sliceEvents () {
  const slices = document.querySelector('#slices')
  eventDelegate(slices, 'mouseover', 'li', function (event) {
    document.querySelectorAll('.layer-' + this.dataset.objectid)
      .forEach(div => div.classList.add('has-slice'))
  })
  eventDelegate(slices, 'mouseout', 'li', function (event) {
    document.querySelectorAll('.has-slice')
      .forEach(div => div.classList.remove('has-slice'))
  })
  eventDelegate(slices, 'click', 'li', function (event) {
    const layercls = '.layer-' + this.dataset.objectid
    const instances = document.querySelectorAll(layercls)
    const instance = instances[0]
    if (!instances.length) {
      message(localize('The slice not in current artboard.'))
      return
    }
    const offsets = instance.getBoundingClientRect()
    const viewer = document.querySelector('.screen-viewer')
    const scrolls = {
      left: viewer.scrollLeft,
      top: viewer.scrollTop
    }
    const sizes = {
      width: instance.clientWidth,
      height: instance.clientHeight
    }
    const viewerSizes = {
      width: viewer.clientWidth,
      height: viewer.clientHeight
    }
    viewer.scrollLeft = (offsets.left + scrolls.left) - ((viewerSizes.width - sizes.width) / 2)
    viewer.scrollTop = (offsets.top + scrolls.top - 60) - ((viewerSizes.height - sizes.height) / 2)
    clickElement(instance)
  })
}
