'use strict';

import { NAMESPACE } from '../consts';

export default class WheelHandler {
  static bind() {
    let events = $._data(window, 'events');
    if (!events || !events.wheel || !events.wheel.some(e => e.namespace == NAMESPACE)) {
      $(window).on(`wheel.${NAMESPACE}`, (e) => {
        WheelHandler.handle(e)
      });
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
        WheelHandler.wheelMoved(instance, $slider, WheelHandler.isUp(e));
      }
    })
  }

  static isUp(e) {
    return e.originalEvent && e.originalEvent.deltaY && e.originalEvent.deltaY > 0;
  }

  static wheelMoved(instance, $slider, up) {
    let type = $slider.data(`${NAMESPACE}-type`);
    let value = $slider.slider('value');
    let option = instance.options.sliders[type];

    if (up) {
      value = Math.max(option.min, value - option.step)
    } else {
      value = Math.min(option.max, value + option.step)
    }

    $slider.slider('value', value);
    instance.sliderChanged();
  }
}
