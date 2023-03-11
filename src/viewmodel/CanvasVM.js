import { trackPlayer, calculatePlayerMovement, drawPlayer } from "./PlayerVM";
const dpr = window.devicePixelRatio || 1;
let playerX = 100;
let playerWidth = 70;
export let arrowStates = {
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

    playerX = calculatePlayerMovement(rect.width, playerWidth, playerX, arrowStates);
    const updatedPlayerX = trackPlayer(playerWidth, playerX, canvas);

    drawPlayer(ctx, playerWidth, updatedPlayerX);
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