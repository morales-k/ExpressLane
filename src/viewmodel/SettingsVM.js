export const setCSSVar = (side) => {
  let root = document.documentElement;

  switch (side) {
    case 'arrowsLeft':
      root.style.setProperty('--arrowsLeft', '25px');
      root.style.setProperty('--arrowsRight', '');
      break;
    case 'arrowsRight':
      root.style.setProperty('--arrowsLeft', '');
      root.style.setProperty('--arrowsRight', '25px');
      break;
    default:
      return;
  }
}