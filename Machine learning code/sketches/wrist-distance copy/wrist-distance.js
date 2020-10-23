// @ts-nocheck


/* ----- setup ------ */

// sets up a bodystream with configuration object
const bodies = new BodyStream ({
    posenet: posenet,
    architecture: modelArchitecture.MobileNetV1, 
    detectionType: detectionType.singleBody, 
    videoElement: document.getElementById('video'), 
    samplingRate: 250})
  
let body

bodies.addEventListener('bodiesDetected', (e) => {
  body = e.detail.bodies.getBodyAt(0)
  const distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
  document.getElementById('output').innerText = `Distance between wrists: ${distance}`
  body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)
})

// get elements
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let canvas2 = document.getElementById("canvas2");
let ctx = canvas.getContext("2d");
let ctx2 = canvas2.getContext("2d");


// draw the video, nose and eyes into the canvas
function drawCameraIntoCanvas() {

  // draw the video element into the canvas
  ctx.drawImage(video, 0, 0, video.width, video.height);
  
  
  
if (body) {
   // draw circle for left and right wrist
   //const leftWrist = body.getBodyPart(bodyParts.leftWrist)
  //const rightWrist = body.getBodyPart(bodyParts.rightWrist)
  const nose = body.getBodyPart(bodyParts.nose)


      //draw nose
      ctx.beginPath();
      ctx.arc(nose.position.x, nose.position.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = 'red'
      ctx.fill()

      
      
  }


  requestAnimationFrame(drawCameraIntoCanvas)
}




/* ----- run ------ */

// start body detecting 
bodies.start()
// draw video and body parts into canvas continously 
drawCameraIntoCanvas();

// painting
function draw() {
    if (body) {
        // draw circle for left and right wrist
        //const leftWrist = body.getBodyPart(bodyParts.leftWrist)
       //const rightWrist = body.getBodyPart(bodyParts.rightWrist)
       const nose = body.getBodyPart(bodyParts.nose)

    ctx2.beginPath();
      ctx2.arc(nose.position.x, nose.position.y, 10, 0, 2 * Math.PI);
      ctx2.fillStyle = 'blue'
      ctx2.fill()
}
requestAnimationFrame(draw)
}
bodies.start()

draw();


/*let x=800;
let y=600;
let dx=5;
let dy=5;



function init()
{
  setInterval(draw,10);
}

function draw()
{
ctx2.clearRect(x,y, 800,600);
  ctx2.beginPath();
  ctx2.fillStyle="blue";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  ctx2.arc(x, y, 20, 0, 2 * Math.PI, true);
  //ctx2.closePath();
  ctx2.fill();
  x+=dx;
  y+=dy;

  if( x<0 || x>800) dx=-dx; 
if( y<0 || y>600) dy=-dy; 
x+=dx; 
y+=dy;
}*/

