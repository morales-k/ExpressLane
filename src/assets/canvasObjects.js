// Car
const car = (ctx, x) => {
  ctx.beginPath();
  ctx.rect(x, 75, 70, 70);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.stroke(); 
};

export {car};