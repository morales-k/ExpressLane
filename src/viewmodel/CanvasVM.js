import { trackPlayer, calculatePlayerMovement, drawPlayer } from "./PlayerVM";
const dpr = window.devicePixelRatio || 1;
export let player = {
  x: 100,
  y: 100,
  size: 70,
};
export let arrowStates = {
  leftArrow: false,
  rightArrow: false,
  upArrow: false,
  downArrow: false,
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
 * @param {Object} canvas - The canvas element itself.
 */
export function draw(canvas) {
    const ctx = canvas.current.getContext('2d');
    const rect = canvas.current.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    player = calculatePlayerMovement(rect.width, rect.height, player, arrowStates);
    const updatedPlayer = trackPlayer(player, canvas);

    drawPlayer(ctx, updatedPlayer);
    requestAnimationFrame(() => draw(canvas, updatedPlayer));
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
  } else if (e.key === "ArrowUp") {
      e.type === "keyup" ? arrowStates.upArrow = false : arrowStates.upArrow = true;
  } else if (e.key === "ArrowDown") {
    e.type === "keyup" ? arrowStates.downArrow = false : arrowStates.downArrow = true;
  }
}