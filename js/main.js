$(document).ready(function() {
  window.Balls.initialize();
});

window.Balls = (function() {

  var Balls = {

    ballArray: [],
    speed: 1,

    initialize: function() {
      // get width/height
      this.screen = {
        height: window.screen.availHeight,
        width: window.screen.availWidth
      };
      this.rootEle = document.getElementById('view');

      this.add(new Ball(10, 10));

    },

    add: function(ball) {
      this.ballArray.push(ball);
      ball.moveTo(this.screen.width/2, this.screen.height/2);
      this.rootEle.appendChild(ball.getEle());
    }
  };


  window.addEventListener('deviceorientation', function(event) {
    Balls.ballArray.forEach(function(ball) {
      ball.moveBy(event.gamma*Balls.speed, event.beta*Balls.speed);
    });
  }, false);


  var Ball = function(radius) {

    this.ele = document.createElement('div');
    this.ele.setAttribute('style', 'position:absolute;width:'+(radius*2)+'px;height:'+(radius*2)+'px;background:red; border-radius:'+radius+'px');
  };

  Ball.prototype = {
    moveBy: function(x, y) {
      this.ele.style.top = (parseInt(this.ele.style.top) + y) + 'px';
      this.ele.style.left = (parseInt(this.ele.style.left) + x) + 'px';
    },
    moveTo: function(x, y) {
      this.ele.style.top = y + 'px';
      this.ele.style.left = x + 'px';
    },
    getEle: function() {
      return this.ele;
    }
  };

  Balls.Ball = Ball;

  return Balls;

})();