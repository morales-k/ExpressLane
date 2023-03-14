import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Canvas from "../Canvas";
import { handleEvent, arrowStates, player } from "../../ViewModel/CanvasVM";
import { calculatePlayerMovement } from "../../ViewModel/PlayerVM";
const directions = ["Left", "Right", "Up", "Down"];
const maxWidth = 100;
const maxHeight = 100;

const releaseKeys = () => {
  directions.map(dir => {
    const arrowReleased = new KeyboardEvent("keyup", {"key": `Arrow${dir}`});
    handleEvent(arrowReleased);
  });
};

describe("Player moves left/right depending on key press, without going out of bounds.", () => {
  test("Player moves left.", () => {
    render(<Canvas />);
    releaseKeys();

    const leftArrowPressed = new KeyboardEvent("keydown", {"key": "ArrowLeft"});
    handleEvent(leftArrowPressed);
    player.x = 10;
    const updatedPlayer = calculatePlayerMovement(maxWidth, maxHeight, player, arrowStates);
  
    expect(updatedPlayer.x).toBeLessThan(11);
    expect(updatedPlayer.x).toBeGreaterThanOrEqual(0);
  });
  
  test("Player moves right.", () => {
    render(<Canvas />);
    releaseKeys();

    const rightArrowPressed = new KeyboardEvent("keydown", {"key": "ArrowRight"});
    handleEvent(rightArrowPressed);
    player.x = 10;
    const updatedPlayer = calculatePlayerMovement(maxWidth, maxHeight, player, arrowStates);
  
    expect(updatedPlayer.x).toBeGreaterThan(10);
    expect(updatedPlayer.x).toBeLessThanOrEqual(maxWidth - player.size);
  });
});