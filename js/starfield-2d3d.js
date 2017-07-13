'use strict';

function draw_logic(){
    for(var entity in core_entities){
        // Draw stars.
        canvas_buffer.fillStyle = 'rgb('
          + core_entities[entity]['brightness'] + ', '
          + core_entities[entity]['brightness'] + ', '
          + core_entities[entity]['brightness'] + ')';
        canvas_buffer.fillRect(
          core_entities[entity]['x'],
          core_entities[entity]['y'],
          3,
          3
        );
    }
}

function logic(){
    // Create 5 stars at random positions.
    var loop_counter = 4;
    do{
        core_entity_create({
          'properties': {
            'brightness': 0,
            'x': core_random_integer({
              'max': canvas_width,
            }),
            'y': core_random_integer({
              'max': canvas_height,
            }),
          },
        });
    }while(loop_counter--);

    for(var entity in core_entities){
        // Delete stars that are outside the canvas boundaries.
        if(core_entities[entity]['x'] < 0
          || core_entities[entity]['x'] > canvas_width
          || core_entities[entity]['y'] < 0
          || core_entities[entity]['y'] > canvas_height){
            core_entity_remove({
              'entities': [
                entity,
              ],
            });
            continue;
        }

        // Increase star brightness.
        core_entities[entity]['brightness'] += 9;

        // Update star positions based on brightness.
        core_entities[entity]['x'] += Math.abs((core_entities[entity]['x'] - canvas_x) / canvas_x)
          * ((core_entities[entity]['x'] > canvas_x ? ratio : -ratio) * 9)
          * (core_entities[entity]['brightness'] / 99);
        core_entities[entity]['y'] += Math.abs((core_entities[entity]['y'] - canvas_y) / canvas_y)
          * (core_entities[entity]['y'] > canvas_y ? 9 : -9)
          * (core_entities[entity]['brightness'] / 99);
    }
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
