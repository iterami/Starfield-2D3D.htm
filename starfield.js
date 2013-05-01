function draw(){
    canvas.clearRect(0,0,width,height);
    i=4;
    do{
        stars.push([Math.random()*width,Math.random()*height,0])
    }while(i--);
    i=stars.length-1;
    do{
        if(stars[i][0]<0||stars[i][0]>width||stars[i][1]<0||stars[i][1]>height){
            stars.splice(i,1)
        }else{
            stars[i][2]+=9;
            stars[i][0]+=Math.abs((stars[i][0]-x)/x)*((stars[i][0]>x?ratio:-ratio)*9)*(stars[i][2]/99);
            stars[i][1]+=Math.abs((stars[i][1]-y)/y)*(stars[i][1]>y?9:-9)*(stars[i][2]/99);
            canvas.fillStyle='rgb('+stars[i][2]+','+stars[i][2]+','+stars[i][2]+')';
            canvas.fillRect(stars[i][0],stars[i][1],3,3)
        }
    }while(i--)
}
function get(i){
    return document.getElementById(i)
}
function resize(){
    width=get('c').width=window.innerWidth;
    height=get('c').height=window.innerHeight;
    x=width/2;
    y=height/2;
    ratio=width/height
}
var canvas=height=i=ratio=width=x=y=0,
stars=[];

window.onresize=resize;

canvas=get('c').getContext('2d');

resize();

setInterval('draw()',35)
