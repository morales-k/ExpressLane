import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Canvas from "../Canvas";
import { handleEvent, arrowStates } from "../../ViewModel/CanvasVM";
import { calculatePlayerMovement } from "../../ViewModel/PlayerVM";

describe("Player moves left/right depending on key press, without going out of bounds.", () => {
  test("Player moves left.", () => {
    render(<Canvas />);
    const maxWidth = 100;
    const playerWidth = 70;
    const playerX = 30;
    const leftArrowPressed = new KeyboardEvent("keydown", {"key": "ArrowLeft"});
    const rightArrowUp = new KeyboardEvent("keyup", {"key": "ArrowRight"});
  
    handleEvent(rightArrowUp);
    handleEvent(leftArrowPressed);
    const updatedXCoord = calculatePlayerMovement(maxWidth, playerWidth, playerX, arrowStates);
  
    expect(updatedXCoord).toBeLessThan(playerX);
    expect(updatedXCoord).toBeGreaterThanOrEqual(0);
  });
  
  test("Player moves right.", () => {
    render(<Canvas />);
    const maxWidth = 100;
    const playerWidth = 70;
    const playerX = 20;
    const leftArrowUp = new KeyboardEvent("keyup", {"key": "ArrowLeft"});
    const rightArrowPressed = new KeyboardEvent("keydown", {"key": "ArrowRight"});
  
    handleEvent(leftArrowUp);
    handleEvent(rightArrowPressed);
    const updatedXCoord = calculatePlayerMovement(maxWidth, playerWidth, playerX, arrowStates);
  
    expect(updatedXCoord).toBeGreaterThan(playerX);
    expect(updatedXCoord).toBeLessThanOrEqual(maxWidth - playerWidth);
  });
});