'use strict';

function repo_drawlogic(){
    entity_group_modify({
      'groups': [
        'star',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'fillStyle': 'rgb('
              + entity['brightness'] + ', '
              + entity['brightness'] + ', '
              + entity['brightness'] + ')',
          });
          canvas.fillRect(
            entity['x'],
            entity['y'],
            core_storage_data['stars-width'],
            core_storage_data['stars-height']
          );
      },
    });
}

function repo_logic(){
    let loop_counter = Math.floor(core_storage_data['stars-frame']);
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
          if(entity['x'] < 0
            || entity['x'] > canvas_properties['width']
            || entity['y'] < 0
            || entity['y'] > canvas_properties['height']){
              entity_remove({
                'entities': [
                  entity['id'],
                ],
              });
              return;
          }

          entity['brightness'] += 9;
          entity['x'] += Math.abs((entity['x'] - canvas_properties['width-half']) / canvas_properties['width-half'])
            * ((entity['x'] > canvas_properties['width-half'] ? ratio : -ratio) * 9)
            * (entity['brightness'] / 99);
          entity['y'] += Math.abs((entity['y'] - canvas_properties['height-half']) / canvas_properties['height-half'])
            * (entity['y'] > canvas_properties['height-half'] ? 9 : -9)
            * (entity['brightness'] / 99);
      },
    });
}

function repo_init(){
    core_repo_init({
      'globals': {
        'ratio': 0,
      },
      'storage': {
        'stars-frame': 4,
        'stars-height': 3,
        'stars-width': 3,
      },
      'storage-menu': '<table><tr><td><input class=mini id=stars-frame min=1 step=1 type=number><td>Stars/Frame'
        + '<tr><td><input class=mini id=stars-height min=1 step=any type=number><td>Stars Height'
        + '<tr><td><input class=mini id=stars-width min=1 step=any type=number><td>Stars Width</table>',
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
