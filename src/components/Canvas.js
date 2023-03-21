import React, {useState, useEffect, useRef} from 'react'
import { handleDirection, setupCanvas, draw } from '../ViewModel/CanvasVM';
import ArrowKeys from './ArrowKeys';

function Canvas() {
  const [canvasReady, setCanvasReady] = useState(false);
  const canvas = useRef();

  // Set up listeners
  useEffect(() => {
    setupCanvas(canvas, setCanvasReady);
    canvas.current.focus(); // Used with tabIndex = 0 to put canvas in focus on load.

    window.addEventListener('resize', () => {
      setupCanvas(canvas, setCanvasReady);
    });

    window.addEventListener('keydown', (e) => handleDirection(e));
    window.addEventListener('keyup', (e) => handleDirection(e));

    // Clean up
    return () => {
      window.removeEventListener('resize', () => {
        setupCanvas(canvas, setCanvasReady);
      });

      window.removeEventListener('keydown', (e) => handleDirection(e));
      window.removeEventListener('keyup', (e) => handleDirection(e));
    };
  }, []);

  useEffect(() => {
    if (canvasReady) {
      draw(canvas);
    }
  }, [canvasReady]);

  return (
    <>
      <ArrowKeys />
      <canvas 
        data-testid="canvasTest"
        id="canvas" 
        ref={canvas} 
        tabIndex={0} 
        onKeyDown={(e) => handleDirection(e)} />
    </>
  )
}

export default Canvas;