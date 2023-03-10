import { trackPlayer, calculatePlayerX, drawPlayer } from "./PlayerVM";
const dpr = window.devicePixelRatio || 1;
let playerX = 100;
let playerWidth = 70;
let arrowStates = {
  leftArrow: false,
  rightArrow: false,
};

/**
 * Scales canvas by dpr to fix blur and sets canvas ready state.
 * 
 * @param {object} canvas - Canvas element itself.
 * @returns ctx
 */
export function setupCanvas(canvas, setCanvasReady) {
    const rect = canvas.current.getBoundingClientRect();
    const ctx = canvas.current.getContext('2d');

    canvas.current.width = rect.width * dpr;
    canvas.current.height = window.innerHeight * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.scale(dpr, dpr);
    setCanvasReady(true);
    return ctx;
}

/**
 * Clears & redraws the canvas. 
 * 
 * @param {object} canvas - The canvas element itself.
 * @param {number} playerX - The player's X coord.
 */
export function draw(canvas) {
    const ctx = canvas.current.getContext('2d');
    const rect = canvas.current.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const currentPlayerX = calculatePlayerX(rect.width, 75, playerWidth, arrowStates);
    const updatedPlayerX = trackPlayer(75, currentPlayerX, canvas);

    drawPlayer(ctx, updatedPlayerX);
    requestAnimationFrame(() => draw(canvas, playerX));
}

/**
 * Handles user events.
 * 
 * @param {object} e - The event object.
 */
export function handleEvent(e) {
  if (e.key === "ArrowLeft") {
       e.type === "keyup" ? arrowStates.leftArrow = false : arrowStates.leftArrow = true;
  } else if (e.key === "ArrowRight") {
      e.type === "keyup" ? arrowStates.rightArrow = false : arrowStates.rightArrow = true;
  }
}

// Moves player based on arrow keys. tabIndex MUST be focused(0) for onKeyDown event to fire.
export function calculatePlayerMovement(playerX) {
  let updatedXCoord = playerX;

  if (arrowStates.leftArrow) {
    if (playerX < 25) { // Prevent negative X coordiate.
      updatedXCoord = 0;
    } else {
      updatedXCoord = playerX - 25;
    }
  } else if (arrowStates.rightArrow) {
    if (playerX + 95 >= window.screen.availWidth) { // 95 is used because the player is 70 pixels wide & moving by 25 pixels.
      updatedXCoord = window.screen.availWidth - 70;
    } else {
      updatedXCoord = playerX + 25;
    }
  }

  return updatedXCoord;
}