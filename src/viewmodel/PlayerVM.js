/**
 * Draws a rectangle with it's origin begining at player x coord.
 * 
 * @param {Object} ctx - The context of the canvas object.
 * @param {Object} updatedPlayer - Player object containing x/y coords and size.
 */
export const drawPlayer = (ctx, updatedPlayer) => {
  ctx.beginPath();
  ctx.rect(updatedPlayer.x, updatedPlayer.y, updatedPlayer.size, updatedPlayer.size);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.stroke(); 
};

/**
 * Calculates & returns the current player position.
 * 
 * @param {Number} maxWidth - Width of the canvas bounding rect.
 * @param {Number} maxHeight - Height of the canvas bounding rect.
 * @param {Object} player - Player object containing x/y coords and size.
 * @param {Object} arrowStates - Object indicating if left or right arrow key is currently pressed.
 * @returns 
 */
export function calculatePlayerMovement(maxWidth, maxHeight, player, arrowStates) {
  let updatedPlayer = player;

  if (!!arrowStates.leftArrow && player.x >= 0) {
    updatedPlayer.x = player.x -= 10;
  } else if (!!arrowStates.rightArrow && player.x <= maxWidth - player.size) {
    updatedPlayer.x = player.x += 10;
  } else if (!!arrowStates.upArrow && player.y > 0) {
    updatedPlayer.y = player.y -= 10;
  } else if (!!arrowStates.downArrow && player.y < maxHeight - player.size) {
    updatedPlayer.y = player.y += 10;
  }

  return updatedPlayer;
}

/**
* Updates coordinates & detects canvas edge.
* 
* @param {Object} player - X/Y coords and player size.
* @param {Object} canvas - The canvas element itself.
* @returns Number;
*/
export function trackPlayer(player, canvas) {
  const rect = canvas.current.getBoundingClientRect();
  const leftEdgeCollision = player.x <= 0 ? true : false;
  const rightEdgeCollision = player.x >= rect.width - player.size? true : false;
  let updatedPlayer = player;

  // Reset coords if mouse touches edge.
  if (leftEdgeCollision) {
    updatedPlayer.x = 0;
  } else if (rightEdgeCollision) {
    updatedPlayer.x = rect.width - player.size;
  } else {
    updatedPlayer.x = player.x;
  }

  return updatedPlayer;
}