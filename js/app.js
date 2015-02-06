angular.module('hitTheDot', ['ngTouch'])
  .controller('htdController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.dots = [];

    $scope.init = function() {
      var totalDots = 15;

      for (var i = 0; i < totalDots; i++) {
        this.dots.push({
          isRevealed: false,
          isHit: false
        });
      }
    };

    $scope.start = function() {

      // Clone array
      var dots = this.dots.slice(0);
      var sequence = [];
      var randomIndex = 0;
      var lastIndex = -1;

      // Create sequence
      while (sequence.length < dots.length) {

        // Random value between 0 and dots.length - 1
        randomIndex  = Math.floor(Math.random() * dots.length);

        // If element isn't false, add element to sequence
        if(dots[randomIndex]) {

          // Add new index to sequence
          sequence.push(randomIndex);

          // Set element to false to avoid being reused
          dots[randomIndex] = false;

          // Reset all dots when starting new game
          this.dots[randomIndex].isRevealed = false;
          this.dots[randomIndex].isHit = false;
        }

      }

      for (var i = 0; i <= this.dots.length; i++) {

        $timeout(function() { 
          if (lastIndex >= 0) {
            this.dots[lastIndex].isRevealed = false;
          }

          if (sequence.length > 0) {
            lastIndex = sequence.pop();
            this.dots[lastIndex].isRevealed = true;
          }
        }.bind(this), 750 * i);
      }

    };

    $scope.hit = function() {
      if (this.dot.isRevealed) {
        this.dot.isHit = true;
      }
    }

  }]);
