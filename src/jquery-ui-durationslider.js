'use strict';

import 'jquery-ui-durationslider.scss';
import Durationslider from 'durationslider';
import { NAMESPACE } from 'namespace';

$.fn.durationslider = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if (!$elem.data(NAMESPACE)) {
      let ds = new Durationslider($elem, options);
      $elem.data(NAMESPACE, ds);
    }
  });
};

$.durationslider = {
  getDefaults: Durationslider.getDefaults,
  setDefaults: Durationslider.setDefaults
};
