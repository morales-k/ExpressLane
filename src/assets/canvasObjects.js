// Car
const car = (ctx) => {
  // Main body
  ctx.beginPath();
  ctx.rect(100, 75, 70, 70);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.stroke(); 
};

export {car};