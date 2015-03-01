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
          + stars[star][2] + ', '
          + stars[star][2] + ', '
          + stars[star][2] + ')';
        canvas.fillRect(
          stars[star][0],
          stars[star][1],
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
        stars.push([
          Math.random() * width,// X
          Math.random() * height,// Y
          0,// Brightness
        ]);
    }while(loop_counter--);

    for(var star in stars){
        if(stars[star][0] < 0
          || stars[star][0] > width
          || stars[star][1] < 0
          || stars[star][1] > height){
            // Delete stars that are outside the canvas boundaries.
            delete stars[star];
            continue;
        }

        // Increase star brightness.
        stars[star][2] += 9;

        // Update star positions based on brightness.
        stars[star][0] += Math.abs((stars[star][0] - x) / x)
          * ((stars[star][0] > x ? ratio : -ratio) * 9)
          * (stars[star][2] / 99);
        stars[star][1] += Math.abs((stars[star][1] - y) / y)
          * (stars[star][1] > y ? 9 : -9)
          * (stars[star][2] / 99);
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
