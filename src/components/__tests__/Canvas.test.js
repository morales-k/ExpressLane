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
  const directions = ["Left", "Right", "Up", "Down"];

  directions.map(dir => {
    test("On key press, it's state is true.", () => {
      render(<Canvas />);
      const arrowPressed = new KeyboardEvent("keydown", {"key": `Arrow${dir}`});
      const currKey = dir.toLocaleLowerCase() + "Arrow";
      handleEvent(arrowPressed);
      expect(arrowStates[currKey]).toBe(true);
    });
  });

  directions.map(dir => {
    test("On key release, it's state is false.", () => {
      render(<Canvas />);
      const arrowReleased = new KeyboardEvent("keyup", {"key": `Arrow${dir}`});
      const currKey = dir.toLocaleLowerCase() + "Arrow";
      handleEvent(arrowReleased);
      expect(arrowStates[currKey]).toBe(false);
    });
  });
});