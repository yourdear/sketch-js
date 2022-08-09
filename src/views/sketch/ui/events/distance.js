import { zoomSize, unitSize, percentageSize } from '../render/helper'
import { state } from '../common'
import { getIntersection } from './helper'

export function distance () {
  if (state.selectedIndex === undefined) return
  if (state.selectedIndex == state.targetIndex && !state.tempTargetRect) return

  const selectedRect = getRect(state.selectedIndex)
  const targetRect = state.tempTargetRect || getRect(state.targetIndex)
  let topData; let rightData; let bottomData; let leftData
  const x = zoomSize(selectedRect.x + selectedRect.width / 2)
  const y = zoomSize(selectedRect.y + selectedRect.height / 2)

  const selectedX2 = selectedRect.x + selectedRect.width
  const selectedY2 = selectedRect.y + selectedRect.height
  const targetX2 = targetRect.x + targetRect.width
  const targetY2 = targetRect.y + targetRect.height
  if (!getIntersection(selectedRect, targetRect)) {
    if (selectedRect.y > targetY2) { // top
      topData = {
        x: x,
        y: zoomSize(targetY2),
        h: zoomSize(selectedRect.y - targetY2),
        distance: unitSize(selectedRect.y - targetY2),
        percentageDistance: percentageSize((selectedRect.y - targetY2), state.current.height)
      }
    }
    if (selectedX2 < targetRect.x) { // right
      rightData = {
        x: zoomSize(selectedX2),
        y: y,
        w: zoomSize(targetRect.x - selectedX2),
        distance: unitSize(targetRect.x - selectedX2),
        percentageDistance: percentageSize((targetRect.x - selectedX2), state.current.width)
      }
    }
    if (selectedY2 < targetRect.y) { // bottom
      bottomData = {
        x: x,
        y: zoomSize(selectedY2),
        h: zoomSize(targetRect.y - selectedY2),
        distance: unitSize(targetRect.y - selectedY2),
        percentageDistance: percentageSize((targetRect.y - selectedY2), state.current.height)
      }
    }
    if (selectedRect.x > targetX2) { // left
      leftData = {
        x: zoomSize(targetX2),
        y: y,
        w: zoomSize(selectedRect.x - targetX2),
        distance: unitSize(selectedRect.x - targetX2),
        percentageDistance: percentageSize((selectedRect.x - targetX2), state.current.width)
      }
    }
  } else {
    const distance = getDistance(selectedRect, targetRect)
    if (distance.top != 0) { // top
      topData = {
        x: x,
        y: (distance.top > 0) ? zoomSize(targetRect.y) : zoomSize(selectedRect.y),
        h: zoomSize(Math.abs(distance.top)),
        distance: unitSize(Math.abs(distance.top)),
        percentageDistance: percentageSize(Math.abs(distance.top), state.current.height)
      }
    }
    if (distance.right != 0) { // right
      rightData = {
        x: (distance.right > 0) ? zoomSize(selectedX2) : zoomSize(targetX2),
        y: y,
        w: zoomSize(Math.abs(distance.right)),
        distance: unitSize(Math.abs(distance.right)),
        percentageDistance: percentageSize(Math.abs(distance.right), state.current.width)
      }
    }
    if (distance.bottom != 0) { // bottom
      bottomData = {
        x: x,
        y: (distance.bottom > 0) ? zoomSize(selectedY2) : zoomSize(targetY2),
        h: zoomSize(Math.abs(distance.bottom)),
        distance: unitSize(Math.abs(distance.bottom)),
        percentageDistance: percentageSize(Math.abs(distance.bottom), state.current.height)
      }
    }
    if (distance.left != 0) { // left
      leftData = {
        x: (distance.left > 0) ? zoomSize(targetRect.x) : zoomSize(selectedRect.x),
        y: y,
        w: zoomSize(Math.abs(distance.left)),
        distance: unitSize(Math.abs(distance.left)),
        percentageDistance: percentageSize(Math.abs(distance.left), state.current.width)
      }
    }
  }
  if (topData) {
    const td = (document.querySelector('#td'))
    td.style.left = topData.x + 'px'
    td.style.top = topData.y + 'px'
    td.style.height = topData.h + 'px'
    td.style.display = ''
    const tdDiv = (document.querySelector('#td div'))
    tdDiv.setAttribute('data-height', topData.distance)
    tdDiv.setAttribute('percentage-height', topData.percentageDistance)
  }
  if (rightData) {
    const rd = (document.querySelector('#rd'))
    rd.style.left = rightData.x + 'px'
    rd.style.top = rightData.y + 'px'
    rd.style.width = rightData.w + 'px'
    rd.style.display = ''
    const rdDiv = (document.querySelector('#rd div'))
    rdDiv.setAttribute('data-width', rightData.distance)
    rdDiv.setAttribute('percentage-width', rightData.percentageDistance)
  }
  if (bottomData) {
    const bd = (document.querySelector('#bd'))
    bd.style.left = bottomData.x + 'px'
    bd.style.top = bottomData.y + 'px'
    bd.style.height = bottomData.h + 'px'
    bd.style.display = ''
    const bdDiv = (document.querySelector('#bd div'))
    bdDiv.setAttribute('data-height', bottomData.distance)
    bdDiv.setAttribute('percentage-height', bottomData.percentageDistance)
  }
  if (leftData) {
    const ld = (document.querySelector('#ld'))
    ld.style.left = leftData.x + 'px'
    ld.style.top = leftData.y + 'px'
    ld.style.width = leftData.w + 'px'
    ld.style.display = ''
    const ldDiv = (document.querySelector('#ld div'))
    ldDiv.setAttribute('data-width', leftData.distance)
    ldDiv.setAttribute('percentage-width', leftData.percentageDistance)
  }
  (document.querySelector('.selected'))
    .classList.add('hidden')
}

export function hideDistance () {
  ['#td', '#rd', '#bd', '#ld'].forEach(s => {
    const el = document.querySelector(s)
    if (el) {
      el.style.display = 'none'
    }
  })
  if (document.querySelector('.selected')) {
    document.querySelector('.selected').classList.remove('hidden')
  }
}

function getRect (index) {
  const layer = state.current.layers[index]
  return layer.rect
}

function getDistance (selected, target) {
  return {
    top: (selected.y - target.y),
    right: (target.x + target.width - selected.x - selected.width),
    bottom: (target.y + target.height - selected.y - selected.height),
    left: (selected.x - target.x)
  }
}
