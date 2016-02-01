'use strict';

function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    for(var star in stars){
        // Draw stars.
        buffer.fillStyle = 'rgb('
          + stars[star]['luminosity'] + ', '
          + stars[star]['luminosity'] + ', '
          + stars[star]['luminosity'] + ')';
        buffer.fillRect(
          stars[star]['x'],
          stars[star]['y'],
          3,
          3
        );
    }

    canvas.clearRect(
      0,
      0,
      width,
      height
    );
    canvas.drawImage(
      document.getElementById('buffer'),
      0,
      0
    );

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

    loop_counter = stars.length - 1;
    do{
        // Delete stars that are outside the canvas boundaries.
        if(stars[loop_counter]['x'] < 0
          || stars[loop_counter]['x'] > width
          || stars[loop_counter]['y'] < 0
          || stars[loop_counter]['y'] > height){
            stars.splice(
              loop_counter,
              1
            );
            continue;
        }

        // Increase star luminosity.
        stars[loop_counter]['luminosity'] += 9;

        // Update star positions based on luminosity.
        stars[loop_counter]['x'] += Math.abs((stars[loop_counter]['x'] - x) / x)
          * ((stars[loop_counter]['x'] > x ? ratio : -ratio) * 9)
          * (stars[loop_counter]['luminosity'] / 99);
        stars[loop_counter]['y'] += Math.abs((stars[loop_counter]['y'] - y) / y)
          * (stars[loop_counter]['y'] > y ? 9 : -9)
          * (stars[loop_counter]['luminosity'] / 99);
    }while(loop_counter--);
}

function resize(){
    height = window.innerHeight;
    document.getElementById('buffer').height = height;
    document.getElementById('canvas').height = height;
    y = height / 2;

    width = window.innerWidth;
    document.getElementById('buffer').width = width;
    document.getElementById('canvas').width = width;
    x = width / 2;

    ratio = width / height;
}

var buffer = document.getElementById('buffer').getContext('2d', {
  'alpha': false,
});
var canvas = document.getElementById('canvas').getContext('2d', {
  'alpha': false,
});
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
      logic,
      35
    );
};

window.onresize = resize;
