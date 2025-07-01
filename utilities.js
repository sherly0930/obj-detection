// define func that's going to allow us to draw on screen
// pass our predictions thru func

export const drawRect = (detections, ctx) =>{
    // loop thru each detection
    detections.forEach(prediction=>{
        // get prediction results
        const [x,y,width,height] = prediction['bbox'];
        const text = prediction['class'];

        // set styling
        //const color = 'green'   // create variable color, color & text of the box will be green
        const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        ctx.strokeStyle= color
        ctx.font = '18px Arial'
        ctx.fillStyle = color

        // draw rectangles & text
        ctx.beginPath()
        ctx.fillText(text, x, y)  // pass the text extracted from prediction, x & y coordinates
        ctx.rect(x,y, width, height)
        ctx.stroke()
    })
}