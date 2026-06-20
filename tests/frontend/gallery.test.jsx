import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";

import App from "../../src/App.jsx";

describe("teaching-scene gallery", () => {
  test("opens and closes the teaching-scene image lightbox", async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("gallery-card-classroom-guidance"));

    const lightbox = screen.getByTestId("image-lightbox");

    expect(lightbox).toBeInTheDocument();
    expect(within(lightbox).getByText("教学现场")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByTestId("image-lightbox")).not.toBeInTheDocument();
    });
  });
});
