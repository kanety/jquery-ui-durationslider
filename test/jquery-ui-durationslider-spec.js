describe('jquery-durationslider', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['test/index.html'];
  });

  it('has sliders', function() {
    var $ex = $('#ex1');
    var $hour = $('#ex1_hour');
    var $minute = $('#ex1_minute');
    $ex.durationslider({
      sliders: {
        h: { elem: $hour },
        m: { elem: $minute }
      }
    });

    expect($ex.val()).toEqual('10:08');
    expect($hour.slider('value')).toEqual(10);
    expect($minute.slider('value')).toEqual(8);

    $hour.slider('value', 11).trigger('slide', { value: 11 });
    $minute.slider('value', 9).trigger('slide', { value: 9 });
    expect($ex.val()).toEqual('11:09');
    expect($hour.slider('value')).toEqual(11);
    expect($minute.slider('value')).toEqual(9);
  });

  it('includes a second slider', function() {
    var $ex = $('#ex2');
    var $hour = $('#ex2_hour');
    var $minute = $('#ex2_minute');
    var $second = $('#ex2_second');
    $ex.durationslider({
      sliders: {
        h: { elem: $hour },
        m: { elem: $minute },
        s: { elem: $second }
      }
    });

    expect($ex.val()).toEqual('10:08:59');
    expect($hour.slider('value')).toEqual(10);
    expect($minute.slider('value')).toEqual(8);
    expect($second.slider('value')).toEqual(59);
  });

  it('handles mousewheel', function() {
    // IE can't handle WheelEvent
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1) {
      return;
    }

    var $ex = $('#ex5');
    var $hour = $('#ex5_hour');
    var $minute = $('#ex5_minute');
    $('#ex5').durationslider({
      sliders: {
        h: { elem: $hour },
        m: { elem: $minute }
      },
      mousewheel: true
    });

    $hour.find('.ui-slider-handle').addClass('ui-state-focus');
    $minute.find('.ui-slider-handle').addClass('ui-state-focus');

    var event = new WheelEvent('wheel', { deltaX: 0, deltaY: -1, deltaZ: 0 });
    window.dispatchEvent(event);

    expect($ex.val()).toEqual('11:11');
  });
});
