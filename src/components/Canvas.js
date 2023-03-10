import React, {useState, useEffect, useRef} from 'react'
import { handleEvent, setupCanvas, draw, calculatePlayerMovement } from '../ViewModel/CanvasVM';
import ArrowKeys from './ArrowKeys';

function Canvas() {
  const orientation = window.matchMedia("(orientation: portrait)");
  const [canvasReady, setCanvasReady] = useState(false);
  const [isPortrait, setPortrait] = useState(orientation.matches);
  const canvas = useRef();

  // Set up listeners
  useEffect(() => {
    setupCanvas(canvas, setCanvasReady);
    canvas.current.focus(); // Used with tabIndex = 0 to put canvas in focus on load.

    window.addEventListener('resize', () => {
      setupCanvas(canvas, setCanvasReady);
      setPortrait(orientation.matches);
    });

    window.addEventListener('keydown', (e) => calculatePlayerMovement(e));
    window.addEventListener('keyup', (e) => calculatePlayerMovement(e));

    // Clean up
    return () => {
      window.removeEventListener('resize', () => {
        setupCanvas(canvas, setCanvasReady);
        setPortrait(orientation.matches);
      });

      window.removeEventListener('keydown', (e) => calculatePlayerMovement(e));
      window.removeEventListener('keyup', (e) => calculatePlayerMovement(e));
    };
  }, []);

  useEffect(() => {
    if (canvasReady) {
      draw(canvas);
    }
  }, [canvasReady]);

  return (
    <>
      {/* <ArrowKeys 
        calculatePlayerMovement={calculatePlayerMovement} /> */}
      <canvas 
        id="canvas" 
        ref={canvas} 
        tabIndex={0} 
        onKeyDown={(e) => handleEvent(e)} />
    </>
  )
}

export default Canvas