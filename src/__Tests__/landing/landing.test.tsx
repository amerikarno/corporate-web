import "@testing-library/jest-dom";
import Landing from "@/pages/landing/landing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";
// import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("landing page", () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    const navigate = require("react-router-dom").useNavigate;
    navigate.mockImplementation(() => mockNavigate);
  });

  test("render", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("asset-card-Active-0")).toBeInTheDocument();
    });
  });

  test("click asset card", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("asset-card-Active-0")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("asset-card-Active-0"));
    });

    const link = "/asset/Active/0";
    expect(mockNavigate).toHaveBeenCalledWith(link);
  });

  test("click login", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("login-btn")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("login-btn"));
    });

    const link = "/authentication/login";
    expect(mockNavigate).toHaveBeenCalledWith(link);
  });

  test("click signup", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("signup-btn")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("signup-btn"));
    });

    const link = "/authentication/signup/type/";
    expect(mockNavigate).toHaveBeenCalledWith(link);
  });
});
