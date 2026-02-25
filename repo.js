'use strict';

function draw_star(entity){
    canvas_setproperties({
      'fillStyle': 'rgb('
        + entity.brightness + ', '
        + entity.brightness + ', '
        + entity.brightness + ')',
    });
    canvas.fillRect(
      entity.x,
      entity.y,
      core_storage_data.stars_width,
      core_storage_data.stars_height
    );
}

function move_star(entity){
    if(entity.x < 0
      || entity.x > canvas_properties.width
      || entity.y < 0
      || entity.y > canvas_properties.height){
        entity_remove({
          'entities': [
            entity.id,
          ],
        });
        return;
    }

    entity.brightness += 5;
    entity.x += Math.abs((entity.x - canvas_properties.width_half) / canvas_properties.width_half)
      * ((entity.x > canvas_properties.width_half ? ratio : -ratio) * 9)
      * (entity.brightness / 99);
    entity.y += Math.abs((entity.y - canvas_properties.height_half) / canvas_properties.height_half)
      * (entity.y > canvas_properties.height_half ? 9 : -9)
      * (entity.brightness / 99);
}

function repo_drawlogic(){
    entity_group_modify({
      'groups': [
        'star',
      ],
      'todo': draw_star,
    });
}

function repo_init(){
    core_repo_init({
      'globals': {
        'ratio': 0,
      },
      'storage': {
        'stars_frame': 4,
        'stars_height': 3,
        'stars_width': 3,
      },
      'storage_menu': '<table><tr><td><input class=mini id=stars_frame min=1 step=1 type=number><td>Stars/Frame'
        + '<tr><td><input class=mini id=stars_height min=1 step=any type=number><td>Stars Height'
        + '<tr><td><input class=mini id=stars_width min=1 step=any type=number><td>Stars Width</table>',
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

function repo_logic(){
    for(let i = 0; i < core_storage_data.stars_frame; i++){
        entity_create({
          'properties': {
            'x': core_random_integer(canvas_properties.width),
            'y': core_random_integer(canvas_properties.height),
          },
          'types': [
            'star',
          ],
        });
    }

    entity_group_modify({
      'groups': [
        'star',
      ],
      'todo': move_star,
    });
}

function repo_resizelogic(){
    ratio = canvas_properties.width / canvas_properties.height;
}
