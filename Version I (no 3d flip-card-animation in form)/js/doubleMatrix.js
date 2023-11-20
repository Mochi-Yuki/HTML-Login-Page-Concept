// initialize the canvas and context
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// setting fontsize & characters
const fontSize = 15; 
const characters = ['0','1'];

let columns, dropsHorizontal, dropsVertical;

// set the canvas size initially
setCanvasSize();

// function to set the canvas size
function setCanvasSize() {
    const blueHillImage = document.getElementById('blueHill');
    // deduct a safety margin value (10 px) from the calculated dimensions to ensure canvas is always slightly smaller
    // than blueHill element to prevent possible animmation overflow
    const safetyMargin = 10; 
    const newWidth = Math.floor(blueHillImage.clientWidth) - safetyMargin;
    const newHeight = Math.floor(blueHillImage.clientHeight) - safetyMargin;

    if (canvasWidth !== newWidth || canvasHeight !== newHeight) {
        // update canvas size and dimensions to match the new values
        canvas.width = newWidth;
        canvas.height = newHeight;
        // update stored canvas dimensions to reflect the changes
        canvasWidth = newWidth;
        canvasHeight = newHeight;

        // calculate the number of columns and initialize drops arrays
        columns = Math.floor(canvas.width / fontSize);
        dropsVertical = Array(columns).fill(1);
        dropsHorizontal = Array(columns).fill(1);
    }

    // redraw the canvas content when the dimensions change
    draw();
}

// debounced resize handler function to optimize the resizing process by delaying the execution of the 
// resizing process until the user has finished resizing the window
let resizeTimer;

function debouncedResize() {
    clearTimeout(resizeTimer); // cancels the previous resize action
    resizeTimer = setTimeout(setCanvasSize, 125); // adjust delay as needed
}

window.addEventListener('resize', debouncedResize);

function draw() {
    //setting the fill color to a very faint black with some transparency for clearing the canvas with the 'ctx.fillRect' operation,
    //creating a fading effect to simulate the raindrop animation
    ctx.fillStyle = 'rgba(0, 0, 0, .05)';
    //1st parameter: x-coordinate (horizontal position) of the top-left corner of the rectangle
    //2nd parameter: y-coordinate (vertical position) of the top-left corner of the rectangle
    //3rd parameter: width of the rectangle, set to ensure entire canvas is cleared horizontally
    //4th parameter: height of the rectangle, set to ensure entire canvas is cleared vertically
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dropsVertical.length; i++) {
        //determines if the character in the column should be reset to its initial position at the top of the canvas
        //when it exceeds the height of the canvas (=character has reached or fallen below the bottom of the canvas)
        //including an additional check to introduce randomness into the reset behavior of the characters: 
        //in only approximately 5% of the cases will the character be reset to the canvas top to make the animation more dynamic
        if (dropsVertical[i] * fontSize > canvas.height && Math.random() > .95) {
            dropsVertical[i] = 0;
        }

        if (dropsHorizontal[i] * fontSize > canvas.width && Math.random() > .95) {
            dropsHorizontal[i] = 0;
        }

        //generating random character ('0' or '1')
        const text = characters[Math.floor(Math.random() * characters.length)];
        //setting the color of the characters (non-transparent fluo blue)
        ctx.fillStyle = 'rgba(0, 128, 255, 1)';
        //add a semi-transparent white outline to the characters
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; 
        ctx.lineWidth = 2; 
        //method to draw text on the canvas, specifying the string, the x-coordinate & y-coordinate where to start drawing on the canvas
        ctx.fillText(text, i * fontSize, dropsVertical[i] * fontSize);
        ctx.fillText(text, dropsHorizontal[i] * fontSize, i * fontSize);
        //increment to make the character fall
        dropsVertical[i]++;
        dropsHorizontal[i]++;
    }
}

//loop the animation with setInterval() function: parameter 1 is draw() function + parameter 2 is time interval in milliseconds
setInterval(draw, 33);