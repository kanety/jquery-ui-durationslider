import { NAMESPACE } from './consts';
import WheelHandler from './wheel-handler';

const DEFAULTS = {
  d: {
    elem: null,
    min: 0,
    max: 10,
    step: 1
  },
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
  },
  format: null,
  mousewheel: false
};

export default class Durationslider {
  constructor(input, options = {}) {
    this.options = $.extend(true, {}, DEFAULTS, options);

    this.$input = $(input);
    this.init();
  }

  init() {
    this.$sliders = [];

    ['d', 'h', 'm', 's'].forEach((type) => {
      let option = this.options[type];
      if (!option.elem) {
        return;
      }

      let $slider = $(option.elem).addClass(NAMESPACE).data(NAMESPACE, this);
      $slider.slider({ min: option.min, max: option.max, step: option.step, type: type });
      this.$sliders.push($slider);
    });

    if (!this.options.format) {
      this.options.format = this.defaultFormat();
    }

    this.textChanged();
    this.bind();
  }

  defaultFormat() {
    return this.$sliders.map(($slider) => {
      let type = $slider.slider('option', 'type');
      return `${type}${type}`;
    }).join(':');
  }

  bind() {
    this.$input.on(`input.${NAMESPACE}`, (e) => {
      this.textChanged();
    }).on(`blur.${NAMESPACE}`, (e) => {
      if (this.$input.val()) {
        this.sliderChanged();
      }
    });

    this.$sliders.forEach(($slider) => {
      $slider.on(`slide.${NAMESPACE}`, (e, ui) => {
        $(e.target).slider('value', ui.value);
        this.sliderChanged();
      });
    });

    if (this.options.mousewheel) {
      WheelHandler.bind();
    }
  }

  unbind() {
    this.$input.off(`.${NAMESPACE}`);

    this.$sliders.forEach(($slider) => {
      $slider.off(`.${NAMESPACE}`);
    });
  }

  dhms() {
    return Durationslider.toDHMS(this.$input.val(), this.options.format);
  }

  seconds() {
    return this.$sliders.map(($slider) => {
      return Durationslider.toSecond($slider.slider('option', 'type'), $slider.slider('value'));
    }).reduce((x, y) => {
      return x + y;
    });
  }

  textChanged() {
    let time = this.dhms();
    this.$sliders.forEach(($slider) => {
      $slider.slider('value', time[$slider.slider('option', 'type')]);
    });
  }

  sliderChanged() {
    let text = Durationslider.toText(this.seconds(), this.options.format);
    if (this.$input.val() != text) {
      this.$input.val(text).trigger('change');
    }
  }

  static toDHMS(text, format) {
    let values = text.match(/\d+/g);
    let formats = format.replace(/\[.*?\]/g, '').match(/d+|h+|m+|s+/g);

    let time = { d: 0, h: 0, m: 0, s: 0 };
    for (let i=0; i<Math.min(values.length, formats.length); i++) {
      let val = values[i];
      let fmt = formats[i];
      if (fmt.match(/[d]/)) {
        time.d += Number(val);
      } else if (fmt.match(/[h]/)) {
        time.h += Number(val);
      } else if (fmt.match(/[m]/)) {
        time.m += Number(val);
      } else if (fmt.match(/[s]/)) {
        time.s += Number(val);
      }
    }
    return time;
  }

  static toSecond(type, value) {
    switch (type) {
    case 'd':
      return value * 3600 * 24;
    case 'h':
      return value * 3600;
    case 'm':
      return value * 60;
    case 's':
      return value;
    }
    return 0;
  }

  static toText(seconds, format) {
    let formats = format.match(/\[.+?\]|d+|h+|m+|s+|./g);

    let time = { d: 0, h: 0, m: 0, s: 0 };
    if (formats.some((fmt) => fmt.match(/^d+$/))) {
      time.d = Math.floor(seconds / (3600 * 24));
    }
    if (formats.some((fmt) => fmt.match(/^h+$/))) {
      time.h = Math.floor((seconds - (time.d * 3600 * 24)) / 3600);
    }
    if (formats.some((fmt) => fmt.match(/^m+$/))) {
      time.m = Math.floor((seconds - (time.d * 3600 * 24) - (time.h * 3600)) / 60);
    }
    if (formats.some((fmt) => fmt.match(/^s+$/))) {
      time.s = seconds - (time.d * 3600 * 24) - (time.h * 3600) - (time.m * 60);
    }

    let text = '';
    formats.forEach((fmt) => {
      let part;
      if (fmt.match(/^\[.+\]$/)) {
        part = fmt.slice(1, -1);
      } else if (fmt.match(/^d+$/)) {
        part = Durationslider.padding(time.d.toString(), fmt.length);
      } else if (fmt.match(/^h+$/)) {
        part = Durationslider.padding(time.h.toString(), fmt.length);
      } else if (fmt.match(/^m+$/)) {
        part = Durationslider.padding(time.m.toString(), fmt.length);
      } else if (fmt.match(/^s+$/)) {
        part = Durationslider.padding(time.s.toString(), fmt.length);
      } else {
        part = fmt;
      }
      text += part;
    });
    return text;
  }

  static padding(text, length) {
    for (let i=0; i<length - text.length; i++) {
      text = '0' + text;
    }
    return text;
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    $.extend(true, DEFAULTS, options);
  }
}
