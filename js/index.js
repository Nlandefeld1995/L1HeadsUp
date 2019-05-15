function buildcharts(){

  //SVG gauges script
  // 1st
  var firstGauge = document.querySelector('.container:nth-of-type(2) .progress');
  var firstTarget = overaltarget;
  var firstGaugeReadout = document.querySelector('.container:nth-of-type(2) .percentage > .value');
  // 3rd
  var thirdGauge = document.querySelector('.container:nth-of-type(3) .progress');
  var thirdTarget = overalgoaltarget;
  var thirdGaugeReadout = document.querySelector('.container:nth-of-type(3) .percentage > .value');
  //variables
  var gaugeR = parseInt(document.querySelectorAll('circle')[0].getAttribute('r'));
  var gaugeC = gaugeR * Math.PI * 2;
  var animationDuration = 1;

  //init svg circles
  var circles = document.querySelectorAll('circle');
  var gauges = document.querySelectorAll('.progress');
  TweenMax.set(circles, {
    strokeDashoffset: gaugeC
  });

  TweenMax.set(gauges, {
    attr: {
      'stroke-dasharray': gaugeC + ' ' + gaugeC
    }
  });

  //calculate the offset
  function calculateOffset(t, c) {
    var target = c - (c * t) / 100;
    return target;
  }
  function sevencalculateOffset(t, c) {
      var target = c - (c * t) / 7;
      return target;  
  }
  function weeksevencalculateOffset(t, c) {
    var target = c - (c * t) / 35;
    return target;  
  }
  //timeline
  var tl = new TimelineMax();
  //first gauge animation
  tl.to(firstGauge, animationDuration, {
    strokeDashoffset: calculateOffset(firstTarget, gaugeC),
    ease: Bounce.easeOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(firstGauge.style.strokeDashoffset);
      firstGaugeReadout.textContent = Math.round(100 - (currentStrokeOffset * 100) / gaugeC);
    }

  });
  //third gauge animation
  tl.to(thirdGauge, animationDuration, {
    strokeDashoffset: calculateOffset(thirdTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(thirdGauge.style.strokeDashoffset);
      thirdGaugeReadout.textContent = Math.round(100 - (currentStrokeOffset * 100) / gaugeC);
    }
  });
  ////////////////////////////////////////////////////////////////
  // velocity gauge
  var velocityGauge = document.getElementById('velocitycircle');
  var velocityTarget = velocity;
  var velocityGaugeReadout = document.getElementById('velocitycirclespan');
  //velocity gauge animation
  tl.to(velocityGauge, 1, {
    strokeDashoffset: calculateOffset(velocityTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(velocityGauge.style.strokeDashoffset);
      velocityGaugeReadout.textContent = Math.round(100 - (currentStrokeOffset * 100) / gaugeC);
    }
  });
  // csat gauge
  var csatGauge = document.getElementById('csatcircle');
  var csatTarget = csattarget;
  var csatGaugeReadout = document.getElementById('csatcirclespan');
  //csat gauge animation
  tl.to(csatGauge, 1, {
    strokeDashoffset: calculateOffset(csatTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(csatGauge.style.strokeDashoffset);
      csatGaugeReadout.textContent = Math.round(100 - (currentStrokeOffset * 100) / gaugeC);
    }
  });
  // compliance gauge
  var complianceGauge = document.getElementById('compliancecircle');
  var complianceTarget = compliancetarget;
  var complianceGaugeReadout = document.getElementById('compliancecirclespan');
  //compliance gauge animation
  tl.to(complianceGauge, 1, {
    strokeDashoffset: calculateOffset(complianceTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(complianceGauge.style.strokeDashoffset);
      complianceGaugeReadout.textContent = Math.round(100 - (currentStrokeOffset * 100) / gaugeC);
    }
  });
  // daily gauge
  var dailyGauge = document.getElementById('dailycircle');
  var dailyTarget = todaytarget ;
  var dailyGaugeReadout = document.getElementById('dailycirclespan');
  //daily gauge animation
  tl.to(dailyGauge, 1, {
    strokeDashoffset: calculateOffset(dailyTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(dailyGauge.style.strokeDashoffset);
      dailyGaugeReadout.textContent = Math.round(100 - (currentStrokeOffset * 100) / gaugeC);
    }
  });
  // weekly gauge
  var weeklyGauge = document.getElementById('weeklycircle');
  var weeklyTarget = weektarget;
  var weeklyGaugeReadout = document.getElementById('weeklycirclespan');
  //weekly gauge animation
  tl.to(weeklyGauge, 1, {
    strokeDashoffset: calculateOffset(weeklyTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(weeklyGauge.style.strokeDashoffset);
      weeklyGaugeReadout.textContent = Math.round(100 - (currentStrokeOffset * 100) / gaugeC);
    }
  });
  // daysevensfollow gauge
  var daysevensfollowGauge = document.getElementById('daysevensfollowcircle');
  var daysevensfollowTarget = followuptoday;
  var daysevensfollowGaugeReadout = document.getElementById('daysevensfollowcirclespan');
  //daysevensfollow gauge animation
  tl.to(daysevensfollowGauge, 1, {
    strokeDashoffset: sevencalculateOffset(daysevensfollowTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(daysevensfollowGauge.style.strokeDashoffset);
      daysevensfollowGaugeReadout.textContent = daysevensfollowTarget;
    }
  });
  // daysevensclosed gauge
  var daysevensclosedGauge = document.getElementById('daysevensclosedcircle');
  var daysevensclosedTarget = casestoday;
  var daysevensclosedGaugeReadout = document.getElementById('daysevensclosedcirclespan');
  //daysevensclosed gauge animation
  tl.to(daysevensclosedGauge, 1, {
    strokeDashoffset: sevencalculateOffset(daysevensclosedTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(daysevensclosedGauge.style.strokeDashoffset);
      daysevensclosedGaugeReadout.textContent = daysevensclosedTarget;
    }
  });
  // daysevenstaken gauge
  var daysevenstakenGauge = document.getElementById('daysevenstakencircle');
  var daysevenstakenTarget = takentoday;
  var daysevenstakenGaugeReadout = document.getElementById('daysevenstakencirclespan');
  //daysevenstaken gauge animation
  tl.to(daysevenstakenGauge, 1, {
    strokeDashoffset: sevencalculateOffset(daysevenstakenTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(daysevenstakenGauge.style.strokeDashoffset);
      daysevenstakenGaugeReadout.textContent = daysevenstakenTarget;
    }
  });
  // weeksevensfollow gauge
  var weeksevensfollowGauge = document.getElementById('weeksevensfollowcircle');
  var weeksevensfollowTarget = followupweek;
  var weeksevensfollowGaugeReadout = document.getElementById('weeksevensfollowcirclespan');
  //weeksevensfollow gauge animation
  tl.to(weeksevensfollowGauge, 1, {
    strokeDashoffset: weeksevencalculateOffset(weeksevensfollowTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(weeksevensfollowGauge.style.strokeDashoffset);
      weeksevensfollowGaugeReadout.textContent = weeksevensfollowTarget;
    }
  });
  // weeksevensclosed gauge
  var weeksevensclosedGauge = document.getElementById('weeksevensclosedcircle');
  var weeksevensclosedTarget = casesweek;
  var weeksevensclosedGaugeReadout = document.getElementById('weeksevensclosedcirclespan');
  //weeksevensclosed gauge animation
  tl.to(weeksevensclosedGauge, 1, {
    strokeDashoffset: weeksevencalculateOffset(weeksevensclosedTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(weeksevensclosedGauge.style.strokeDashoffset);
      weeksevensclosedGaugeReadout.textContent = weeksevensclosedTarget;
    }
  });
  // weeksevenstaken gauge
  var weeksevenstakenGauge = document.getElementById('weeksevenstakencircle');
  var weeksevenstakenTarget = takenweek;
  var weeksevenstakenGaugeReadout = document.getElementById('weeksevenstakencirclespan');
  //weeksevenstaken gauge animation
  tl.to(weeksevenstakenGauge, 1, {
    strokeDashoffset: weeksevencalculateOffset(weeksevenstakenTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(weeksevenstakenGauge.style.strokeDashoffset);
      weeksevenstakenGaugeReadout.textContent = weeksevenstakenTarget;
    }
  });
  // opencases gauge
  var opencasesGauge = document.getElementById('opencasescircle');
  var opencasesTarget = 28;
  var opencasesGaugeReadout = document.getElementById('opencasescirclespan');
  //opencases gauge animation
 /* tl.to(opencasesGauge, 1, {
    strokeDashoffset: weeksevencalculateOffset(opencasesTarget, gaugeC),
    ease: Power3.easeInOut,
    onUpdate: function() {
      var currentStrokeOffset = parseInt(opencasesGauge.style.strokeDashoffset);
      opencasesGaugeReadout.textContent = opencasesTarget;
    }
  });
*/

}