'use strict';

function repo_drawlogic(){
    entity_group_modify({
      'groups': [
        'star',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'properties': {
              'fillStyle': 'rgb('
                + entity_entities[entity]['brightness'] + ', '
                + entity_entities[entity]['brightness'] + ', '
                + entity_entities[entity]['brightness'] + ')',
            },
          });
          canvas_buffer.fillRect(
            entity_entities[entity]['x'],
            entity_entities[entity]['y'],
            3,
            3
          );
      },
    });
}

function repo_logic(){
    let loop_counter = 4;
    do{
        entity_create({
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

    entity_group_modify({
      'groups': [
        'star',
      ],
      'todo': function(entity){
          if(entity_entities[entity]['x'] < 0
            || entity_entities[entity]['x'] > canvas_properties['width']
            || entity_entities[entity]['y'] < 0
            || entity_entities[entity]['y'] > canvas_properties['height']){
              entity_remove({
                'entities': [
                  entity,
                ],
              });
              return;
          }

          entity_entities[entity]['brightness'] += 9;
          entity_entities[entity]['x'] += Math.abs((entity_entities[entity]['x'] - canvas_properties['width-half']) / canvas_properties['width-half'])
            * ((entity_entities[entity]['x'] > canvas_properties['width-half'] ? ratio : -ratio) * 9)
            * (entity_entities[entity]['brightness'] / 99);
          entity_entities[entity]['y'] += Math.abs((entity_entities[entity]['y'] - canvas_properties['height-half']) / canvas_properties['height-half'])
            * (entity_entities[entity]['y'] > canvas_properties['height-half'] ? 9 : -9)
            * (entity_entities[entity]['brightness'] / 99);
      },
    });
}

function repo_init(){
    core_repo_init({
      'globals': {
        'ratio': 0,
      },
      'title': 'Starfield-2D3D.htm',
    });
    entity_set({
      'properties': {
        'brightness': 0,
      },
      'type': 'star',
    });
    canvas_init();
}

function repo_resizelogic(){
    ratio = canvas_properties['width'] / canvas_properties['height'];
}
