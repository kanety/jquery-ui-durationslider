import { NAMESPACE } from './consts';
import Durationslider from './durationslider';
import './jquery-ui-durationslider.scss';

$.fn.durationslider = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if (!$elem.data(NAMESPACE)) {
      let ds = new Durationslider($elem, options);
      $elem.data(NAMESPACE, ds);
    }
  });
};

$.Durationslider = Durationslider;
