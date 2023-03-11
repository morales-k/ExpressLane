import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Canvas from "../Canvas";
import { arrowStates, handleEvent } from "../../ViewModel/CanvasVM";

test("Canvas is rendered.", () => {
  render(<Canvas />);
  const canvas = screen.getByTestId("canvasTest");
  expect(canvas).toBeInTheDocument();
});

describe("Arrow key events properly adjust arrowStates object.", () => {
  test("On LEFT PRESS, leftArrow is TRUE.", () => {
    render(<Canvas />);
    const leftArrowPressed = new KeyboardEvent("keydown", {"key": "ArrowLeft"});
    handleEvent(leftArrowPressed);
    expect(arrowStates.leftArrow).toBe(true);
  });
  
  test("On LEFT UP, leftArrow is FALSE.", () => {
    render(<Canvas />);
    const leftArrowPressed = new KeyboardEvent("keyup", {"key": "ArrowLeft"});
    handleEvent(leftArrowPressed);
    expect(arrowStates.leftArrow).toBe(false);
  });
  
  test("On RIGHT PRESS, rightArrow is TRUE.", () => {
    render(<Canvas />);
    const rightArrowPressed = new KeyboardEvent("keydown", {"key": "ArrowRight"});
    handleEvent(rightArrowPressed);
    expect(arrowStates.rightArrow).toBe(true);
  });
  
  test("On RIGHT UP, rightArrow is FALSE.", () => {
    render(<Canvas />);
    const rightArrowPressed = new KeyboardEvent("keyup", {"key": "ArrowRight"});
    handleEvent(rightArrowPressed);
    expect(arrowStates.rightArrow).toBe(false);
  });
});