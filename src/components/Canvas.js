import React, {useState, useEffect, useRef} from 'react'
import { setupCanvas, draw } from '../viewmodel/CanvasVM';
import ArrowKeys from './ArrowKeys';

function Canvas() {
  const centerWidth = document.getElementById('gameboard').offsetWidth / 2;
  const centerHeight = document.getElementById('gameboard').offsetHeight / 2;
  const [canvasReady, setCanvasReady] = useState(false);
  const orientation = window.matchMedia("(orientation: portrait)");
  const [canvasCenterX, setCanvasCenterX] = useState(centerWidth);
  const [canvasCenterY, setCanvasCenterY] = useState(centerHeight);
  const [isPortrait, setPortrait] = useState(orientation.matches);
  const [playerX, setplayerX] = useState(100);
  const canvas = useRef();

  // Set up listeners
  useEffect(() => {
    setupCanvas(canvas, setCanvasReady);
    canvas.current.focus(); // Used with tabIndex = 0 to put canvas in focus on load.

    window.addEventListener('resize', () => {
      setupCanvas(canvas, setCanvasReady);
      setPortrait(orientation.matches);
    });

    // Clean up
    return () => {
      window.removeEventListener('resize', () => {
        setupCanvas(canvas, setCanvasReady);
        setPortrait(orientation.matches);
      });
    };
  }, []);

  useEffect(() => {
    if (canvasReady) {
      draw(canvas, playerX);
    }
  }, [canvasReady]);

  // Moves player based on arrow keys. tabIndex MUST be focused(0) for onKeyDown event to fire.
  function movePlayer(e) {
    if (e.target.innerText === '←' || e.key === 'ArrowLeft') {
      if (playerX < 25) { // Prevent negative X coordiate.
        setplayerX(0);
      } else {
        setplayerX(playerX - 25);
      }
    } else if (e.target.innerText === '→' || e.key === 'ArrowRight') {
      if (playerX + 95 >= window.screen.availWidth) { // 95 is used because the player is 70 pixels wide & moving by 25 pixels.
        setplayerX(window.screen.availWidth - 70);
      } else {
        setplayerX(playerX + 25);
      }
    }
  }

  return (
    <>
      <ArrowKeys 
        movePlayer={movePlayer} />
      <canvas 
        id="canvas" 
        ref={canvas} 
        tabIndex={0} 
        onKeyDown={(e) => movePlayer(e)} />
    </>
  )
}

export default Canvas