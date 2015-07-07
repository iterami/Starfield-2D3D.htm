'use strict';

function draw(){
    canvas.clearRect(
      0,
      0,
      width,
      height
    );

    for(var star in stars){
        // Draw stars.
        canvas.fillStyle = 'rgb('
          + stars[star]['luminosity'] + ', '
          + stars[star]['luminosity'] + ', '
          + stars[star]['luminosity'] + ')';
        canvas.fillRect(
          stars[star]['x'],
          stars[star]['y'],
          3,
          3
        );
    }

    window.requestAnimationFrame(draw);
}

function logic(){
    // Create 5 stars at random positions.
    var loop_counter = 4;
    do{
        stars.push({
          'luminosity': 0,
          'x': Math.random() * width,
          'y': Math.random() * height,
        });
    }while(loop_counter--);

    for(var star in stars){
        // Delete stars that are outside the canvas boundaries.
        if(stars[star]['x'] < 0
          || stars[star]['x'] > width
          || stars[star]['y'] < 0
          || stars[star]['y'] > height){
            stars.splice(
              star,
              1
            );
            continue;
        }

        // Increase star luminosity.
        stars[star]['luminosity'] += 9;

        // Update star positions based on luminosity.
        stars[star]['x'] += Math.abs((stars[star]['x'] - x) / x)
          * ((stars[star]['x'] > x ? ratio : -ratio) * 9)
          * (stars[star]['luminosity'] / 99);
        stars[star]['y'] += Math.abs((stars[star]['y'] - y) / y)
          * (stars[star]['y'] > y ? 9 : -9)
          * (stars[star]['luminosity'] / 99);
    }
}

function resize(){
    height = window.innerHeight;
    document.getElementById('canvas').height = height;
    y = height / 2;

    width = window.innerWidth;
    document.getElementById('canvas').width = width;
    x = width / 2;

    ratio = width / height;
}

var canvas = document.getElementById('canvas').getContext('2d');
var height = 0;
var ratio = 0;
var stars = [];
var width = 0;
var x = 0;
var y = 0;

window.onload = function(){
    resize();

    window.requestAnimationFrame(draw);
    window.setInterval(
      'logic()',
      35
    );
};

window.onresize = resize;
