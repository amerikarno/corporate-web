import "@testing-library/jest-dom";
import Landing from "@/pages/landing/landing";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { MemoryRouter } from "react-router-dom";

describe("landing page", () => {
  test("render", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Active")).toBeInTheDocument();
    });
  });
});
