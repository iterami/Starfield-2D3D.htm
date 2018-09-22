'use strict';

function draw_logic(){
    // Draw stars.
    core_group_modify({
      'groups': [
        'star',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'properties': {
              'fillStyle': 'rgb('
                + core_entities[entity]['brightness'] + ', '
                + core_entities[entity]['brightness'] + ', '
                + core_entities[entity]['brightness'] + ')',
            },
          });
          canvas_buffer.fillRect(
            core_entities[entity]['x'],
            core_entities[entity]['y'],
            3,
            3
          );
      },
    });
}

function logic(){
    // Create 5 stars at random positions.
    let loop_counter = 4;
    do{
        core_entity_create({
          'properties': {
            'x': core_random_integer({
              'max': canvas_properties['width'],
            }),
            'y': core_random_integer({
              'max': canvas_properties['height'],
            }),
          },
          'types': [
            'star',
          ],
        });
    }while(loop_counter--);

    core_group_modify({
      'groups': [
        'star',
      ],
      'todo': function(entity){
          // Delete stars that are outside the canvas boundaries.
          if(core_entities[entity]['x'] < 0
            || core_entities[entity]['x'] > canvas_properties['width']
            || core_entities[entity]['y'] < 0
            || core_entities[entity]['y'] > canvas_properties['height']){
              core_entity_remove({
                'entities': [
                  entity,
                ],
              });
              return;
          }

          // Increase star brightness.
          core_entities[entity]['brightness'] += 9;

          // Update star positions based on brightness.
          core_entities[entity]['x'] += Math.abs((core_entities[entity]['x'] - canvas_properties['width-half']) / canvas_properties['width-half'])
            * ((core_entities[entity]['x'] > canvas_properties['width-half'] ? ratio : -ratio) * 9)
            * (core_entities[entity]['brightness'] / 99);
          core_entities[entity]['y'] += Math.abs((core_entities[entity]['y'] - canvas_properties['height-half']) / canvas_properties['height-half'])
            * (core_entities[entity]['y'] > canvas_properties['height-half'] ? 9 : -9)
            * (core_entities[entity]['brightness'] / 99);
      },
    });
}

function repo_init(){
    core_repo_init({
      'entities': {
        'star': {
          'properties': {
            'brightness': 0,
          },
        },
      },
      'globals': {
        'ratio': 0,
      },
      'title': 'Starfield-2D3D.htm',
    });
    canvas_init();
}

function resize_logic(){
    ratio = canvas_properties['width'] / canvas_properties['height'];
}
