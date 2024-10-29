import "@testing-library/jest-dom";
import { store } from "@/redux/store";
import { waitFor, screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import OrderTrade from "@/pages/orderTrade/orderTrade";
import Cookies from "js-cookie";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

describe("invest page", () => {
  test("render without auth", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderTrade />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Session not found/i)).toBeInTheDocument();
    });
  });

  test("render with auth and localStorage", async () => {
    (Cookies.get as jest.Mock).mockReturnValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliODRjNzZkLWZlODQtNDExMy1iYTMwLTE3MDE0YTAyYjZiNSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiYWEyYzY5NjYzNDg2NDdmMzhjYmZiN2YyOWFiNDU5YzE3Zjc0MGZiNTdjYTJmZWIzODQwNDdhNTAzYmIxZTRmNiIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMTAwMSwxMDAyLDEwMDMsMTAwNCwxMDA1LDEwMDYsMTAwNywxMDA4LDEwMDksMTAxMCwyMDAxLDIwMDIsMjAwMywyMDA0LDIwMDUsMjAwNiwyMDA3LDIwMDgsMjAwOSwyMDEwLDIwMTEsMjAxMiwyMDEzLDIwMTQsMjAxNSwyMDE2LDIwMTcsMjAxOCwyMDE5LDIwMjAsMjAyMSwyMDIyLDMwMDEsMzAwMiwzMDAzLDMwMDQsMzAwNSwzMDA2LDMwMDcsMzAwOCwzMDA5LDMwMTAsMzAxMSwzMDEyLDMwMTMsMzAxNCw0MDAxLDQwMDIsNDAwMyw0MDA0LDQwMDUsNDAwNiw1MDAxLDUwMDIsNTAwMyw1MDA0LDUwMDUsNTAwNiw1MDA3LDUwMDgsNTAwOSw1MDEwLDUwMTEsNTAxMiw1MDEzLDUwMTQsNTAxNSw1MDE2LDUwMTcsNTAxOCw1MDE5LDUwMjAsNTAyMSw1MDIyLDUwMjMsNTAyNCw1MDI1LDUwMjYsNTAyNyw1MDI4LDUwMjksNTAzMCw1MDMxLDUwMzIsNTAzMyw1MDM0LDUwMzUsNTAzNiw1MDM3LDYwMDEsNjAwMiw2MDAzLDYwMDQsNjAwNSw2MDA2LDYwMDcsNjAwOCw3MDAxLDcwMDIsNzAwMyw3MDA0LDcwMDUsNzAwNl0sInBlcm1pc3Npb25zIjpbMTAxLDEwMiwxMDMsMjAxLDIwMiwyMDNdLCJyb2xlcyI6WzExLDEyLDEzLDIxLDIyLDIzLDMxLDMyLDMzXSwidXNlcklkIjoiIiwibG9naW5TdGF0dXMiOiIiLCJleHBpcmVzRGF0ZSI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIiwiRXJyb3IiOm51bGwsImV4cCI6MTcyOTkxMjI2NywiaWF0IjoxNzI5ODI1ODY3fQ.YxvZ9etZ-igTybFuGSblbUB9u0OzP593r_1DrCK-QvY"
    );

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

    window.localStorage.setItem("asset", "Active-0");
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderTrade />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Reserve/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Account Information/i)).toBeInTheDocument();
    });
  });

  test("render with auth no localStorage", async () => {
    (Cookies.get as jest.Mock).mockReturnValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliODRjNzZkLWZlODQtNDExMy1iYTMwLTE3MDE0YTAyYjZiNSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiYWEyYzY5NjYzNDg2NDdmMzhjYmZiN2YyOWFiNDU5YzE3Zjc0MGZiNTdjYTJmZWIzODQwNDdhNTAzYmIxZTRmNiIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMTAwMSwxMDAyLDEwMDMsMTAwNCwxMDA1LDEwMDYsMTAwNywxMDA4LDEwMDksMTAxMCwyMDAxLDIwMDIsMjAwMywyMDA0LDIwMDUsMjAwNiwyMDA3LDIwMDgsMjAwOSwyMDEwLDIwMTEsMjAxMiwyMDEzLDIwMTQsMjAxNSwyMDE2LDIwMTcsMjAxOCwyMDE5LDIwMjAsMjAyMSwyMDIyLDMwMDEsMzAwMiwzMDAzLDMwMDQsMzAwNSwzMDA2LDMwMDcsMzAwOCwzMDA5LDMwMTAsMzAxMSwzMDEyLDMwMTMsMzAxNCw0MDAxLDQwMDIsNDAwMyw0MDA0LDQwMDUsNDAwNiw1MDAxLDUwMDIsNTAwMyw1MDA0LDUwMDUsNTAwNiw1MDA3LDUwMDgsNTAwOSw1MDEwLDUwMTEsNTAxMiw1MDEzLDUwMTQsNTAxNSw1MDE2LDUwMTcsNTAxOCw1MDE5LDUwMjAsNTAyMSw1MDIyLDUwMjMsNTAyNCw1MDI1LDUwMjYsNTAyNyw1MDI4LDUwMjksNTAzMCw1MDMxLDUwMzIsNTAzMyw1MDM0LDUwMzUsNTAzNiw1MDM3LDYwMDEsNjAwMiw2MDAzLDYwMDQsNjAwNSw2MDA2LDYwMDcsNjAwOCw3MDAxLDcwMDIsNzAwMyw3MDA0LDcwMDUsNzAwNl0sInBlcm1pc3Npb25zIjpbMTAxLDEwMiwxMDMsMjAxLDIwMiwyMDNdLCJyb2xlcyI6WzExLDEyLDEzLDIxLDIyLDIzLDMxLDMyLDMzXSwidXNlcklkIjoiIiwibG9naW5TdGF0dXMiOiIiLCJleHBpcmVzRGF0ZSI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIiwiRXJyb3IiOm51bGwsImV4cCI6MTcyOTkxMjI2NywiaWF0IjoxNzI5ODI1ODY3fQ.YxvZ9etZ-igTybFuGSblbUB9u0OzP593r_1DrCK-QvY"
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderTrade />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Reserve/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Account Information/i)).toBeInTheDocument();
    });
  });
});
