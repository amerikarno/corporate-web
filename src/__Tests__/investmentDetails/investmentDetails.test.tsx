import "@testing-library/jest-dom";
import { AssetDetails } from "../../pages/assetDetails/assetDetails";
import { store } from "@/redux/store";
import { waitFor, screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

describe("investment details page", () => {
  let originalLocation: Location;

  beforeAll(() => {
    originalLocation = window.location;

    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString();
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    })();

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });

    const url = "http://localhost:5173/asset/Active/0";
    Object.defineProperty(window, "location", {
      value: {
        ...originalLocation,
        href: url,
      },
      writable: true,
    });
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  test("render", async () => {
    const navigate = require("react-router-dom").useNavigate;
    const mockNavigate = jest.fn();
    navigate.mockImplementation(() => mockNavigate);

    const useParams = require("react-router-dom").useParams;
    useParams.mockImplementation(() => ({
      type: "Active",
      id: "0",
    }));

    window.localStorage.setItem("asset", "Active-0");
    expect(window.localStorage.getItem("asset")).toBe("Active-0");

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/asset/Active/0"]}>
          <Routes>
            <Route path="/asset/:type/:id" element={<AssetDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Investment Details/i)).toBeInTheDocument();
    });
  });

  test("invest with login", async () => {
    const navigate = require("react-router-dom").useNavigate;
    const mockNavigate = jest.fn();
    navigate.mockImplementation(() => mockNavigate);

    const useParams = require("react-router-dom").useParams;
    useParams.mockImplementation(() => ({
      type: "Active",
      id: "0",
    }));

    window.localStorage.setItem("asset", "Active-0");
    expect(window.localStorage.getItem("asset")).toBe("Active-0");

    (Cookies.get as jest.Mock).mockReturnValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliODRjNzZkLWZlODQtNDExMy1iYTMwLTE3MDE0YTAyYjZiNSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiYWEyYzY5NjYzNDg2NDdmMzhjYmZiN2YyOWFiNDU5YzE3Zjc0MGZiNTdjYTJmZWIzODQwNDdhNTAzYmIxZTRmNiIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMTAwMSwxMDAyLDEwMDMsMTAwNCwxMDA1LDEwMDYsMTAwNywxMDA4LDEwMDksMTAxMCwyMDAxLDIwMDIsMjAwMywyMDA0LDIwMDUsMjAwNiwyMDA3LDIwMDgsMjAwOSwyMDEwLDIwMTEsMjAxMiwyMDEzLDIwMTQsMjAxNSwyMDE2LDIwMTcsMjAxOCwyMDE5LDIwMjAsMjAyMSwyMDIyLDMwMDEsMzAwMiwzMDAzLDMwMDQsMzAwNSwzMDA2LDMwMDcsMzAwOCwzMDA5LDMwMTAsMzAxMSwzMDEyLDMwMTMsMzAxNCw0MDAxLDQwMDIsNDAwMyw0MDA0LDQwMDUsNDAwNiw1MDAxLDUwMDIsNTAwMyw1MDA0LDUwMDUsNTAwNiw1MDA3LDUwMDgsNTAwOSw1MDEwLDUwMTEsNTAxMiw1MDEzLDUwMTQsNTAxNSw1MDE2LDUwMTcsNTAxOCw1MDE5LDUwMjAsNTAyMSw1MDIyLDUwMjMsNTAyNCw1MDI1LDUwMjYsNTAyNyw1MDI4LDUwMjksNTAzMCw1MDMxLDUwMzIsNTAzMyw1MDM0LDUwMzUsNTAzNiw1MDM3LDYwMDEsNjAwMiw2MDAzLDYwMDQsNjAwNSw2MDA2LDYwMDcsNjAwOCw3MDAxLDcwMDIsNzAwMyw3MDA0LDcwMDUsNzAwNl0sInBlcm1pc3Npb25zIjpbMTAxLDEwMiwxMDMsMjAxLDIwMiwyMDNdLCJyb2xlcyI6WzExLDEyLDEzLDIxLDIyLDIzLDMxLDMyLDMzXSwidXNlcklkIjoiIiwibG9naW5TdGF0dXMiOiIiLCJleHBpcmVzRGF0ZSI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIiwiRXJyb3IiOm51bGwsImV4cCI6MTcyOTkxMjI2NywiaWF0IjoxNzI5ODI1ODY3fQ.YxvZ9etZ-igTybFuGSblbUB9u0OzP593r_1DrCK-QvY"
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/asset/Active/0"]}>
          <Routes>
            <Route path="/asset/:type/:id" element={<AssetDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId("invest-button-asset-details")
      ).toBeInTheDocument();
    });
  });
});
