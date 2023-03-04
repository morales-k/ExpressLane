import { car } from "../assets/canvasObjects";
const dpr = window.devicePixelRatio || 1;

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
export function draw(canvas, playerX) {
    const ctx = canvas.current.getContext('2d');
    const rect = canvas.current.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    car(ctx, playerX);
    requestAnimationFrame(() => draw(canvas, playerX));
}