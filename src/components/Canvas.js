import React, {useState, useEffect, useRef} from 'react'
import {car} from '../assets/canvasObjects';
import ArrowKeys from './ArrowKeys';

function Canvas() {
  const centerWidth = document.getElementById('gameboard').offsetWidth / 2;
  const centerHeight = document.getElementById('gameboard').offsetHeight / 2;
  const orientation = window.matchMedia("(orientation: portrait)");
  const [canvasCenterX, setCanvasCenterX] = useState(centerWidth);
  const [canvasCenterY, setCanvasCenterY] = useState(centerHeight);
  const [isPortrait, setPortrait] = useState(orientation.matches);
  const [carCordX, setCarCordX] = useState(100);
  const canvas = useRef();
  const dpr = window.devicePixelRatio || 1;

  // Set up listeners
  useEffect(() => {
    setupCanvas();
    canvas.current.focus(); // Used with tabIndex = 0 to put canvas in focus on load.

    window.addEventListener('resize', () => {
      setupCanvas();
      setPortrait(orientation.matches);
    });

    // Clean up
    return () => {
      window.removeEventListener('resize', () => {
        setupCanvas();
        setPortrait(orientation.matches);
      });
    };
  }, []);

  // Redraw when orientation changes.
  useEffect(() => {
    draw();
  }, [isPortrait, carCordX]);

  useEffect(() => {
    setupCanvas();
    draw();
  }, [canvasCenterX, canvasCenterY]);

  // Sets canvas and scales based on device pixel ratio.
  function setupCanvas() {
    const rect = canvas.current.getBoundingClientRect();
    const ctx = canvas.current.getContext('2d');
    const resizedWidth = rect.width * dpr;
    const resizedHeight = window.innerHeight * dpr;

    // Scale the current canvas by device pixel ratio to fix blur.
    canvas.current.width = resizedWidth;
    canvas.current.height = resizedHeight;

    // Set height of the canvas itself to fit screen.
    canvas.height = resizedHeight;
    ctx.scale(dpr, dpr);

    // Update canvas center when resized.
    setCanvasCenterX(rect.width / 2);
    setCanvasCenterY(rect.height / 2);
    return ctx;
  }

  // Clears & redraws the canvas.
  function draw() {
    const ctx = canvas.current.getContext('2d');
    const rect = canvas.current.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    car(ctx, carCordX);
  }

  // Moves player based on arrow keys. tabIndex MUST be focused(0) for onKeyDown event to fire.
  function movePlayer(e) {
    if (e.target.innerText === '←' || e.key === 'ArrowLeft') {
      if (carCordX < 25) { // Prevent negative X coordiate.
        setCarCordX(0);
      } else {
        setCarCordX(carCordX - 25);
      }
    } else if (e.target.innerText === '→' || e.key === 'ArrowRight') {
      if (carCordX + 95 >= window.screen.availWidth) { // 95 is used because the player is 70 pixels wide & moving by 25 pixels.
        setCarCordX(window.screen.availWidth - 70);
      } else {
        setCarCordX(carCordX + 25);
      }
    }
  }

  return (
    <>
    <ArrowKeys movePlayer={movePlayer} />
    <canvas id="canvas" ref={canvas} tabIndex={0} onKeyDown={(e) => movePlayer(e)} />
    </>
  )
}

export default Canvas