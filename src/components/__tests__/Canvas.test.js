import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Canvas from "../Canvas";

test("Canvas is rendered.", () => {
  render(<Canvas />);
  const canvas = screen.getByTestId("canvasTest");
  expect(canvas).toBeInTheDocument();
});