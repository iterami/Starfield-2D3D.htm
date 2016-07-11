'use strict';

function draw_logic(){
    for(var star in stars){
        // Draw stars.
        canvas_buffer.fillStyle = 'rgb('
          + stars[star]['luminosity'] + ', '
          + stars[star]['luminosity'] + ', '
          + stars[star]['luminosity'] + ')';
        canvas_buffer.fillRect(
          stars[star]['x'],
          stars[star]['y'],
          3,
          3
        );
    }
}

function logic(){
    // Create 5 stars at random positions.
    var loop_counter = 4;
    do{
        stars.push({
          'luminosity': 0,
          'x': Math.random() * canvas_width,
          'y': Math.random() * canvas_height,
        });
    }while(loop_counter--);

    loop_counter = stars.length - 1;
    do{
        // Delete stars that are outside the canvas boundaries.
        if(stars[loop_counter]['x'] < 0
          || stars[loop_counter]['x'] > canvas_width
          || stars[loop_counter]['y'] < 0
          || stars[loop_counter]['y'] > canvas_height){
            stars.splice(
              loop_counter,
              1
            );
            continue;
        }

        // Increase star luminosity.
        stars[loop_counter]['luminosity'] += 9;

        // Update star positions based on luminosity.
        stars[loop_counter]['x'] += Math.abs((stars[loop_counter]['x'] - canvas_x) / canvas_x)
          * ((stars[loop_counter]['x'] > canvas_x ? ratio : -ratio) * 9)
          * (stars[loop_counter]['luminosity'] / 99);
        stars[loop_counter]['y'] += Math.abs((stars[loop_counter]['y'] - canvas_y) / canvas_y)
          * (stars[loop_counter]['y'] > canvas_y ? 9 : -9)
          * (stars[loop_counter]['luminosity'] / 99);
    }while(loop_counter--);
}

function resize_logic(){
    ratio = canvas_width / canvas_height;
}

var ratio = 0;
var stars = [];

window.onload = canvas_init;
