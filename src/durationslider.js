'use strict';

import { NAMESPACE } from 'consts';
import WheelHandler from 'durationslider/wheel-handler';

const DEFAULTS = {
  format: null,
  sliders: {
    h: {
      elem: null,
      min: 0,
      max: 23,
      step: 1
    },
    m: {
      elem: null,
      min: 0,
      max: 59,
      step: 1
    },
    s: {
      elem: null,
      min: 0,
      max: 59,
      step: 1
    }
  },
  mousewheel: false
};

export default class Durationslider {
  constructor(input, options = {}) {
    this.options = $.extend(true, {}, DEFAULTS, options);

    this.$input = $(input);
    this.init();
  }

  init() {
    this.$sliders = {};

    for (let type in this.options.sliders) {
      let opt = this.options.sliders[type];
      if (!opt.elem) {
        continue;
      }

      let $elem = $(opt.elem);
      $elem.data(`${NAMESPACE}-type`, type)
           .data(`${NAMESPACE}-input`, this.$input)
           .addClass(NAMESPACE)
           .slider({ min: opt.min, max: opt.max, step: opt.step });
      this.$sliders[type] = $elem;
    }

    if (!this.options.format) {
      this.options.format = this.defaultFormat();
    }

    this.textChanged();
    this.bind();
  }

  defaultFormat() {
    let formats = [];
    ['h', 'm', 's'].forEach((type) => {
      if (this.$sliders[type]) {
        formats.push(`${type}${type}`);
      }
    });
    return formats.join(':')
  }

  bind() {
    this.$input.on(`input.${NAMESPACE}`, (e) => {
      this.textChanged();
    });
    this.$input.on(`blur.${NAMESPACE}`, (e) => {
      this.sliderChanged();
    });

    for (let type in this.$sliders) {
      let $slider = this.$sliders[type];
      if ($slider) {
        $slider.on(`slide.${NAMESPACE}`, (e, ui) => {
          let type = $(e.target).data(`${NAMESPACE}-type`);
          this.$sliders[type].slider('value', ui.value);
          this.sliderChanged();
        });
      }
    }

    if (this.options.mousewheel) {
      WheelHandler.bind();
    }
  }

  unbind() {
    this.$input.off(`.${NAMESPACE}`);

    for (let type in this.$sliders) {
      if (this.$sliders[type]) {
        this.$sliders[type].off(`.${NAMESPACE}`);
      }
    }
  }

  textChanged() {
    let values = this.$input.val().split(/[^\d]+/);
    let i = 0;
    ['h', 'm', 's'].forEach((type) => {
      let $slider = this.$sliders[type];
      if ($slider) {
        $slider.slider('value', Number(values[i] || 0));
        i++;
      }
    });
  }

  sliderChanged() {
    let second = 0;
    for (let type in this.$sliders) {
      let $slider = this.$sliders[type];
      second += Durationslider.toSecond(type, $slider.slider('value'));
    }

    let text = Durationslider.toText(second, this.options.format);
    if (this.$input.val() != text) {
      this.$input.val(text).trigger('change');
    }
  }

  static toSecond(type, value) {
    switch (type) {
    case 'h':
      return value * 3600;
    case 'm':
      return value * 60;
    case 's':
      return value;
    }
    return 0;
  }

  static toText(second, format) {
    return moment.duration(second, 'seconds').format(format, { trim: false });
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    $.extend(true, DEFAULTS, options);
  }
}
