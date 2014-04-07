$(document).ready(function() {
  window.Balls.initialize();
});

window.Balls = (function() {

  var Balls = {

    ballArray: [],

    initialize: function() {
      // get width/height
      this.screen = {
        height: window.innerHeight,
        width: window.innerWidth
      };
      this.rootEle = document.getElementById('view');

      this.add(new Ball(10, 1), [10,10]);
      this.add(new Ball(20, 0.6));

    },

    add: function(ball, coordinates) {
      this.ballArray.push(ball);
      if(coordinates) {
        ball.moveTo(coordinates[0], coordinates[1]);
      } else {
        ball.moveTo(this.screen.width/2, this.screen.height/2);
      }
      this.rootEle.appendChild(ball.getEle());
    }
  };


  window.addEventListener('deviceorientation', function(event) {
    Balls.ballArray.forEach(function(ball) {
      ball.moveBy(event.gamma*ball.speed, event.beta*ball.speed);
    });
  }, false);

  window.addEventListener('resize', function(event) {
    Balls.screen.height = window.innerHeight;
    Balls.screen.width = window.innerWidth;
  });


  var Ball = function(radius, speed) {
    this.radius = radius;
    this.speed = speed;
    this.position = {
      x: 0,
      y: 0
    };
    this.ele = document.createElement('div');
    this.ele.setAttribute('style', 'position:absolute;width:'+(radius*2)+'px;height:'+(radius*2)+'px;background:red; border-radius:'+radius+'px');
  };

  Ball.prototype = {
    moveBy: function(x, y) {
      this.moveTo(this.position.x + x, this.position.y + y);
    },
    moveTo: function(x, y) {
      var nextX = x, nextY = y;
      if(y > Balls.screen.height - this.radius) {
        nextY = Balls.screen.height - this.radius;
      } else if (y < this.radius) {
        nextY = this.radius;
      }
      if(x > Balls.screen.width - this.radius) {
        nextX = Balls.screen.width - this.radius;
      } else if (x < this.radius) {
        nextX = this.radius;
      }
      this.ele.style.top = (nextY-this.radius) + 'px';
      this.ele.style.left = (nextX-this.radius) + 'px';
      this.position.x = nextX;
      this.position.y = nextY;

    },
    getEle: function() {
      return this.ele;
    }
  };

  Balls.Ball = Ball;

  return Balls;

})();