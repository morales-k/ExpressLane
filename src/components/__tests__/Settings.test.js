import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import SplashScreen from "../SplashScreen";


test("Settings display when settings button is clicked.", async () => {
  render(<SplashScreen />);
  const settingsBtn = screen.getByText(/Settings/i);
  fireEvent.click(settingsBtn);
  const settings = screen.getByRole("form");
  expect(settings).toBeInTheDocument();
});
