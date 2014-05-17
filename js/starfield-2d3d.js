function draw(){
    canvas.clearRect(
      0,
      0,
      width,
      height
    );

    // create 5 stars at random positions
    var loop_counter = 4;
    do{
        stars.push([
          Math.random() * width,// star x
          Math.random() * height,// star y
          0// star brightness
        ]);
    }while(loop_counter--);

    loop_counter = stars.length - 1;
    do{
        if(stars[loop_counter][0] < 0
          || stars[loop_counter][0] > width
          || stars[loop_counter][1] < 0
          || stars[loop_counter][1] > height){
            // splice stars that are outside the canvas boundaries
            stars.splice(
              loop_counter,
              1
            );

        }else{
            // increase star brightness
            stars[loop_counter][2] += 9;

            // update star positions based on brightness
            stars[loop_counter][0] += Math.abs((stars[loop_counter][0] - x) / x)
              * ((stars[loop_counter][0] > x ? ratio : -ratio) * 9)
              * (stars[loop_counter][2] / 99);
            stars[loop_counter][1] += Math.abs((stars[loop_counter][1] - y) / y)
              * (stars[loop_counter][1] > y ? 9 : -9)
              * (stars[loop_counter][2] / 99);

            // draw stars
            canvas.fillStyle = 'rgb('
              + stars[loop_counter][2] + ', '
              + stars[loop_counter][2] + ', '
              + stars[loop_counter][2] + ')';
            canvas.fillRect(
              stars[loop_counter][0],
              stars[loop_counter][1],
              3,
              3
            );
        }
    }while(loop_counter--);
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

resize();

setInterval(
  'draw()',
  35
);

window.onresize = resize;
