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
    expect($ex.val()).toEqual('11:9');
    expect($hour.slider('value')).toEqual(11);
    expect($minute.slider('value')).toEqual(9);
  });

  it('includes a second slider', function() {
    var $ex = $('#ex3');
    var $hour = $('#ex3_hour');
    var $minute = $('#ex3_minute');
    var $second = $('#ex3_second');
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
});
