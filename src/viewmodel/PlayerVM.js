/**
 * Draws a rectangle with it's origin begining at updatedPlayerX.
 * 
 * @param {object} ctx - The context of the canvas object.
 * @param {number} updatedPlayerX - X coordinate of the mouse.
 */
export const drawPlayer = (ctx, updatedPlayerX) => {
  ctx.beginPath();
  ctx.rect(updatedPlayerX, 75, 70, 70);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.stroke(); 
};

/**
* Updates coordinates & detects canvas edge.
* 
* @param {Number} playerWidth - The width of the player as a % of the canvas.
* @param {Number} playerX - The X coordinate of the player.
* @param {Object} canvas - The canvas element itself.
* @returns Number;
*/
export function trackPlayer(playerWidth, playerX, canvas) {
  const rect = canvas.current.getBoundingClientRect();
  const leftEdgeCollision = playerX <= 0 ? true : false;
  const rightEdgeCollision = playerX >= rect.width - playerWidth ? true : false;
  let updatedPlayerX = 0;

  // Reset coords if mouse touches edge.
  if (leftEdgeCollision) {
      updatedPlayerX = 0;
  } else if (rightEdgeCollision) {
      updatedPlayerX = rect.width - playerWidth;
  } else {
      updatedPlayerX = playerX;
  }

  return updatedPlayerX;
}

/**
* Calculates & returns the current player position.
* 
* @param {Number} maxWidth - The width of the canvas bounding rect.
* @param {Number} playerWidth - The width of the player.
* @param {Number} playerX - Origin of the x-coord of the player.
* @param {object} arrowStates - Object indicating if left or right arrow key is currently pressed.
* @returns 
*/
export function calculatePlayerX(maxWidth, playerWidth, playerX, arrowStates) {
  let updatedPosX = playerX;

  if (!!arrowStates.leftArrow && playerX >= 0) {
      updatedPosX = playerX -= 10;
  } else if (!!arrowStates.rightArrow && playerX <= maxWidth - playerWidth) {
      updatedPosX = playerX += 10;
  }
  
  return updatedPosX;
}