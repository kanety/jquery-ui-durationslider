'use strict';

const NAMESPACE = 'durationslider';
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
  }
};

export default class Durationslider {
  constructor(input, options = {}) {
    this.options = $.extend(true, {}, DEFAULTS, options);

    this.$input = $(input);
    this.$sliders = {};

    this.init();
  }

  init() {
    for (let type in this.options.sliders) {
      let slider = this.options.sliders[type];
      if (!slider.elem) {
        continue;
      }

      let $elem = $(slider.elem);
      $elem.data('type', type);
      $elem.addClass(NAMESPACE);
      $elem.slider({
        min: slider.min,
        max: slider.max,
        step: slider.step
      });
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

    for (let type in this.$sliders) {
      if (this.$sliders[type]) {
        this.$sliders[type].on(`slide.${NAMESPACE}`, (e, ui) => {
          let type = $(e.target).data('type');
          let value = ui.value
          this.sliderChanged(type, value);
        });
      }
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

  sliders() {
    return this.$sliders;
  }

  textChanged() {
    let value = this.$input.val();
    let values = value.split(/[^\d]+/);
    let i = 0;
    ['h', 'm', 's'].forEach((type) => {
      if (this.$sliders[type]) {
        this.$sliders[type].slider('value', Number(values[i] || 0));
        i++;
      }
    });
  }

  sliderChanged(changedType, changedValue) {
    let second = 0;
    for (let type in this.$sliders) {
      let value;
      if (type == changedType) {
        value = changedValue;
      } else {
        value = this.$sliders[type].slider('value');
      }
      second += Durationslider.toSecond(type, value);
    }

    let text = Durationslider.toText(second, this.options.format);
    this.$input.val(text).trigger('change');
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
