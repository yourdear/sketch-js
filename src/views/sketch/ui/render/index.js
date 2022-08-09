import { localize, init, state } from '../common'
import { artboards } from './artboards'
import { slices } from './slices'
import { colors } from './colors'
import { unit } from './unit'
import { zoom } from './zoom'
import { events } from '../events'
import { navigateByURLHash } from '../events/navigate'
import { allAtlasMethod } from '../render/atlas'

function render (data) {
  const innerHTML = [
    '<header class="sketch-header">',
    '<div class="header-center">',
    '<div class="muser"></div>',
    '<div id="zoom" class="zoom-widget">',
    '<button class="zoom-in"></button>',
    '<label class="zoom-text"></label>',
    '<button class="zoom-out"></button>',
    '</div>',
    '<div class="flow-mode">',
    `<label for="flow-mode">${localize('FLOW')}</label>`,
    `<div class="slidebox" title="${localize('Keyboard shortcut')}: f">`,
    '<input id="flow-mode" type="checkbox" name="flow-mode">',
    '<label for="flow-mode"></label>',
    '</div>',
    '</div>',
    '<h1></h1>',
    '<div class="show-notes">',
    `<label for="show-notes">${localize('NOTES')}</label>`,
    `<div class="slidebox" title="${localize('Keyboard shortcut')}: n">`,
    '<input id="show-notes" type="checkbox" name="show-notes" checked="checked">',
    '<label for="show-notes"></label>',
    '</div>',
    '</div>',
    '</div>',
    '</header>',
    '<main>',
    '<aside class="navbar on" style="display: none;">',
    '<div class="header-left">',
    '<div class="showBtn"></div>',
    '<ul class="tab">',
    '<li class="icon-artboards current" data-id="artboards"></li>',
    '<li class="icon-slices" data-id="slices"></li>',
    '<li class="icon-colors" data-id="colors"></li>',
    '</ul>',
    '</div>',
    '<div class="section-view">',
    '<section id="artboards"></section>',
    `<section id="slices" style="display: none;"><div class="empty">${localize('No slices added!')}</div></section>`,
    `<section id="colors" style="display: none;"><div class="empty">${localize('No colors added!')}</div></section>`,
    '</div>',
    '</aside>',
    '<section class="screen-viewer">',
    '<div class="screen-viewer-inner">',
    '<div id="screen" class="screen">',
    '<div id="rulers" style="display:none;">',
    '<div id="rv" class="ruler v"></div>',
    '<div id="rh" class="ruler h"></div>',
    '</div>',
    '<div id="flows"></div>',
    '<div id="layers"></div>',
    '<div id="notes"></div>',
    '<div id="td" class="distance v" style="display:none;"><div data-height="3"></div></div>',
    '<div id="rd" class="distance h" style="display:none;"><div data-width=""></div></div>',
    '<div id="bd" class="distance v" style="display:none;"><div data-height=""></div></div>',
    '<div id="ld" class="distance h" style="display:none;"><div data-width=""></div></div>',
    '</div>',
    '</div>',
    '<div class="overlay"></div>',
    '</section>',
    '</main>',
    '<div id="message" class="message"></div>',
    '<div id="cursor" class="cursor" style="display: none;"></div>'
  ].join('')
  return {
    innerHTML,
    init,
    zoom,
    unit,
    artboards,
    slices,
    colors,
    events,
    navigateByURLHash,
    allAtlasMethod,
    state
  }
}
export {
  render
}
