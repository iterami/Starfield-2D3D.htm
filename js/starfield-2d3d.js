'use strict';

function draw_logic(){
    for(var star in stars){
        // Draw stars.
        canvas_buffer.fillStyle = 'rgb('
          + stars[star]['brightness'] + ', '
          + stars[star]['brightness'] + ', '
          + stars[star]['brightness'] + ')';
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
          'brightness': 0,
          'x': core_random_integer({
            'max': canvas_width,
          }),
          'y': core_random_integer({
            'max': canvas_height,
          }),
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

        // Increase star brightness.
        stars[loop_counter]['brightness'] += 9;

        // Update star positions based on brightness.
        stars[loop_counter]['x'] += Math.abs((stars[loop_counter]['x'] - canvas_x) / canvas_x)
          * ((stars[loop_counter]['x'] > canvas_x ? ratio : -ratio) * 9)
          * (stars[loop_counter]['brightness'] / 99);
        stars[loop_counter]['y'] += Math.abs((stars[loop_counter]['y'] - canvas_y) / canvas_y)
          * (stars[loop_counter]['y'] > canvas_y ? 9 : -9)
          * (stars[loop_counter]['brightness'] / 99);
    }while(loop_counter--);
}

function repo_init(){
    core_repo_init({
      'title': 'Starfield-2D3D.htm',
    });
    canvas_init();
}

function resize_logic(){
    ratio = canvas_width / canvas_height;
}

var ratio = 0;
var stars = [];
