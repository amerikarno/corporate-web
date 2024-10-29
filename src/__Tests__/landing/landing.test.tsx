import "@testing-library/jest-dom";
import Landing from "../../pages/landing/landing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";
import Cookies from "js-cookie";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
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

  test("after login", async () => {
    (Cookies.get as jest.Mock).mockReturnValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliODRjNzZkLWZlODQtNDExMy1iYTMwLTE3MDE0YTAyYjZiNSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiYWEyYzY5NjYzNDg2NDdmMzhjYmZiN2YyOWFiNDU5YzE3Zjc0MGZiNTdjYTJmZWIzODQwNDdhNTAzYmIxZTRmNiIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMTAwMSwxMDAyLDEwMDMsMTAwNCwxMDA1LDEwMDYsMTAwNywxMDA4LDEwMDksMTAxMCwyMDAxLDIwMDIsMjAwMywyMDA0LDIwMDUsMjAwNiwyMDA3LDIwMDgsMjAwOSwyMDEwLDIwMTEsMjAxMiwyMDEzLDIwMTQsMjAxNSwyMDE2LDIwMTcsMjAxOCwyMDE5LDIwMjAsMjAyMSwyMDIyLDMwMDEsMzAwMiwzMDAzLDMwMDQsMzAwNSwzMDA2LDMwMDcsMzAwOCwzMDA5LDMwMTAsMzAxMSwzMDEyLDMwMTMsMzAxNCw0MDAxLDQwMDIsNDAwMyw0MDA0LDQwMDUsNDAwNiw1MDAxLDUwMDIsNTAwMyw1MDA0LDUwMDUsNTAwNiw1MDA3LDUwMDgsNTAwOSw1MDEwLDUwMTEsNTAxMiw1MDEzLDUwMTQsNTAxNSw1MDE2LDUwMTcsNTAxOCw1MDE5LDUwMjAsNTAyMSw1MDIyLDUwMjMsNTAyNCw1MDI1LDUwMjYsNTAyNyw1MDI4LDUwMjksNTAzMCw1MDMxLDUwMzIsNTAzMyw1MDM0LDUwMzUsNTAzNiw1MDM3LDYwMDEsNjAwMiw2MDAzLDYwMDQsNjAwNSw2MDA2LDYwMDcsNjAwOCw3MDAxLDcwMDIsNzAwMyw3MDA0LDcwMDUsNzAwNl0sInBlcm1pc3Npb25zIjpbMTAxLDEwMiwxMDMsMjAxLDIwMiwyMDNdLCJyb2xlcyI6WzExLDEyLDEzLDIxLDIyLDIzLDMxLDMyLDMzXSwidXNlcklkIjoiIiwibG9naW5TdGF0dXMiOiIiLCJleHBpcmVzRGF0ZSI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIiwiRXJyb3IiOm51bGwsImV4cCI6MTcyOTkxMjI2NywiaWF0IjoxNzI5ODI1ODY3fQ.YxvZ9etZ-igTybFuGSblbUB9u0OzP593r_1DrCK-QvY"
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId("invest-button-landing-Active-0")
      ).toBeInTheDocument();
    });
  });
});
