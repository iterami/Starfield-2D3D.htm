function draw(){
    canvas.clearRect(
        0,
        0,
        width,
        height
    );

    /* create 5 stars at random positions */
    i = 4;
    do{
        stars.push([
            Math.random() * width,/* star x */
            Math.random() * height,/* star y */
            0/* star brightness */
        ]);
    }while(i--);

    i = stars.length - 1;
    do{
        if(stars[i][0] < 0 || stars[i][0] > width || stars[i][1] < 0 || stars[i][1] > height){
            /* splice stars that are outside the canvas boundaries */
            stars.splice(
                i,
                1
            );

        }else{
            /* increase star brightness */
            stars[i][2] += 9;

            /* update star positions based on brightness */
            stars[i][0] += Math.abs((stars[i][0] - x) / x) * ((stars[i][0] > x ? ratio : -ratio) * 9) * (stars[i][2] / 99);
            stars[i][1] += Math.abs((stars[i][1] - y) / y) * (stars[i][1] > y ? 9 : -9) * (stars[i][2] / 99);

            /* draw stars */
            canvas.fillStyle = 'rgb(' + stars[i][2] + ',' + stars[i][2] + ',' + stars[i][2] + ')';
            canvas.fillRect(
                stars[i][0],
                stars[i][1],
                3,
                3
            );
        }
    }while(i--);
}

function get(i){
    return document.getElementById(i);
}

function resize(){
    width = get('canvas').width = window.innerWidth;
    height = get('canvas').height = window.innerHeight;

    x = width / 2;
    y = height / 2;

    ratio = width / height;
}

var canvas = get('canvas').getContext('2d');
var height = 0;
var i = 0;
var ratio = 0;
var stars = [];
var width = 0;
var x = 0;
var y = 0;

resize();

setInterval('draw()', 35);

window.onresize = resize;
