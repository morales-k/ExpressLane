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
  const canvas = useRef();
  const dpr = window.devicePixelRatio || 1;

  // Set up listeners
  useEffect(() => {
    setupCanvas();

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
  }, [isPortrait]);

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
    car(ctx);
  }

  return (
    <>
    <ArrowKeys />
    <canvas id="canvas" ref={canvas} />
    </>
  )
}

export default Canvas