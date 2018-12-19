'use strict';

import { NAMESPACE } from '../consts';

export default class MousewheelHandler {
  static bind() {
    let events = $._data(window, 'events');
    if (!events || !events.wheel || !events.wheel.some(e => e.namespace == NAMESPACE)) {
      $(window).on(`wheel.${NAMESPACE}`, MousewheelHandler.handle);
    }
  }

  static unbind() {
    $(window).off(`wheel.${NAMESPACE}`);
  }

  static handle(e) {
    $(document).find('.ui-slider-handle.ui-state-focus').each(function(i, elem) {
      let $slider = $(elem).parent();
      let instance = $slider.data(`${NAMESPACE}-input`).data(NAMESPACE);
      if (instance && instance.options.mousewheel) {
        e.preventDefault();
        instance.wheelMoved($slider, MousewheelHandler.isUp(e));
      }
    })
  }

  static isUp(e) {
    return e.originalEvent.deltaY && e.originalEvent.deltaY < 0;
  }
}
