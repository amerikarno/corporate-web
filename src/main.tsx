import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index.scss";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/landing.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import AddIndividualAccount from "./pages/authentication/addIndividualAccount/addIndividualAccount.tsx";
import BasicInfo from "./pages/authentication/addIndividualAccount/basicInfo/basicInfo.tsx";
import SuitTestFatca from "./pages/authentication/addIndividualAccount/suitTestFatca/suitTestFatca.tsx";
import { OtpEmailConfirm } from "./pages/authentication/addIndividualAccount/otpEmailConfirm/otpEmailConfirm.tsx";
import Liveness from "./pages/authentication/addIndividualAccount/livenessOcr/livenessOcr.tsx";
import { CardWebcamInstructions } from "./pages/authentication/addIndividualAccount/livenessOcr/cardScan/webCamInstructions.tsx";
import IDCardCapture from "./pages/authentication/addIndividualAccount/livenessOcr/cardScan/idCardCapture.tsx";
import IdentityVerification from "./pages/authentication/addIndividualAccount/identityVerification/identityVerification.tsx";
import Personal from "./pages/dashboard/personal/personal.tsx";
import ScrollToTop from "./components/ScrollToTop/ScrolltoTop.tsx";
import Login from "./pages/authentication/login/login.tsx";
import LandingHeader from "./layout/landing/landingHeader.tsx";
import { AssetDetails } from "./pages/assetDetails/assetDetails.tsx";
import SignUpType from "./pages/signUpType/SignUpType.tsx";
import SignUpCorporate from "./pages/signUpType/SignUpCorporate.tsx";

let helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <ScrollToTop />
        <Provider store={store}>
          <Routes>
            <Route
              index
              element={
                <LandingHeader>
                  <Landing />
                </LandingHeader>
              }
            />
            <Route
              path={`${import.meta.env.BASE_URL}authentication/login`}
              element={<Login />}
            />
            <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/type`}
              element={<SignUpType />}
            />
                        <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/addcorporateaccount`}
              element={<SignUpCorporate />}
            />
            <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/addindividualaccount`}
              element={<AddIndividualAccount />}
            />
            <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/basicinfo`}
              element={<BasicInfo />}
            />
            <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/suittestfatca`}
              element={<SuitTestFatca />}
            />
            <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/otpemailconfirm`}
              element={<OtpEmailConfirm />}
            />
            <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/livenessocr`}
              element={<Liveness />}
            />
            <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/webcaminstructions`}
              element={<CardWebcamInstructions />}
            />
            <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/webcaminstructions`}
              element={<CardWebcamInstructions />}
            />
            <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/cardcapture`}
              element={<IDCardCapture />}
            />
            <Route
              path={`${
                import.meta.env.BASE_URL
              }authentication/signup/identityverification`}
              element={<IdentityVerification />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboard/personal`}
              element={<Personal />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}asset/:id`}
              element={<AssetDetails />}
            />
          </Routes>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
