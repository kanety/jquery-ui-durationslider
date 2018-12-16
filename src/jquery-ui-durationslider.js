'use strict';

import 'jquery-ui-durationslider.scss';
import Durationslider from 'durationslider';

const NAMESPACE = 'durationslider';

$.fn.durationslider = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    let slider = new Durationslider($elem, options);
    $elem.data(NAMESPACE, slider);
  });
};

$.durationslider = {
  getDefaults: Durationslider.getDefaults,
  setDefaults: Durationslider.setDefaults
};
