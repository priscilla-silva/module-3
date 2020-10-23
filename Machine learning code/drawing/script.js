let capture;

function setup() {
  createCanvas(800, 600);
  capture = createCapture(VIDEO);
  capture.size(800, 600);
  capture.hide();
  temp = createGraphics(800, 600);

}

function draw() {
    background(255);
    image(capture, 0, 0, 800, 600);
    
  
}

const bodies = new BodyStream ({
  posenet: posenet,
  architecture: modelArchitecture.MobileNetV1, 
  detectionType: detectionType.singleBody,  
  samplingRate: 250})

  let body

bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0)
    const distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
    body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)
})
if (body) {
  // draw circle for left and right wrist
  const leftWrist = body.getBodyPart(bodyParts.leftWrist)
 const rightWrist = body.getBodyPart(bodyParts.rightWrist)
 const nose = body.getBodyPart(bodyParts.nose)
}

 //draw right wrist
 ctx.beginPath();
 ctx.arc(rightWrist.position.x, rightWrist.position.y, 10, 0, 2 * Math.PI);
 ctx.fillStyle = 'white'
 ctx.fill()

 // draw left wrist
 ctx.beginPath();
 ctx.arc(leftWrist.position.x, leftWrist.position.y, 10, 0, 2 * Math.PI);
 ctx.fillStyle = 'white'
 ctx.fill()   
 
 ctx.beginPath();
        ctx.moveTo(nose.position.x, nose.position.y);
        ctx.lineTo(rightWrist.position.x, rightWrist.position.y);
        ctx.strokeStyle = "white"
        ctx.stroke()

        ctx.beginPath();
        ctx.moveTo(nose.position.x, nose.position.y);
        ctx.lineTo(leftWrist.position.x, leftWrist.position.y);
        ctx.strokeStyle = "white"
        
        ctx.stroke()

      



  
  /* ----- run ------ */
  
  // start body detecting 
  bodies.start()