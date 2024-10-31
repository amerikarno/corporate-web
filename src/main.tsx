import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index.scss";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/landing.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import AddIndividualAccount from "./pages/authentication/signUp/addIndividualAccount.tsx";
import BasicInfo from "./pages/authentication/signUp/basicInfo/basicInfo.tsx";
import SuitTestFatca from "./pages/authentication/signUp/suitTestFatca/suitTestFatca.tsx";
import Liveness from "./pages/authentication/signUp/livenessOcr/livenessOcr.tsx";
import { CardWebcamInstructions } from "./pages/authentication/signUp/livenessOcr/cardScan/webCamInstructions.tsx";
import IDCardCapture from "./pages/authentication/signUp/livenessOcr/cardScan/idCardCapture.tsx";
import IdentityVerification from "./pages/authentication/signUp/identityVerification/identityVerification.tsx";
import ScrollToTop from "./components/ScrollToTop/ScrolltoTop.tsx";
import Login from "./pages/authentication/login/login.tsx";
import { AssetDetails } from "./pages/assetDetails/assetDetails.tsx";
import SignUpType from "./pages/authentication/signUp/signUpType/SignUpType.tsx";
import SignUpCorporate from "./pages/authentication/signUp/signUpType/SignUpCorporate.tsx";
import GoogleQr from "./pages/authentication/login/googleAuthen/qrGoogle.tsx";
import QrVerification from "./pages/authentication/login/googleAuthen/qrVerification.tsx";
import { OtpEmailConfirm } from "./pages/authentication/signUp/otpEmailConfirm/otpEmailConfirm.tsx";
import OrderTrade from "./pages/orderTrade/orderTrade.tsx";
import BankOrder from "./pages/bankOrder/bankOrder.tsx";
import Portfolio from "./pages/portfolio/portfolio.tsx";
import HelmetLayout from "./components/helmetLayout.tsx";
import { LivenessInstruction } from "./pages/authentication/signUp/livenessOcr/cardScan/livenessInstruction.tsx";
import { ConfirmSuccess } from "./pages/authentication/signUp/otpEmailConfirm/confirmSuccess.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Test from "./forTest.tsx";
import { ResetPassword } from "./pages/authentication/resetPassword/resetPassword.tsx";
import { VerifyHighNetwork } from "./pages/orderTrade/verifyHighNetwork.tsx";

let helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer
          position="top-center"
          theme="light"
          autoClose={2000}
          pauseOnHover={true}
        />
        <Provider store={store}>
          <Routes>
            <Route element={<HelmetLayout />}>
              <Route path="*" element={<Landing />} />
              <Route index element={<Landing />} />
              <Route path={`/test`} element={<Test />} />
              <Route
                path={`/authentication/reset-password`}
                element={<ResetPassword />}
              />
              <Route path={`/authentication/login`} element={<Login />} />
              <Route
                path={`/authentication/signup/type`}
                element={<SignUpType />}
              />
              <Route
                path={`/authentication/signup/addcorporateaccount`}
                element={<SignUpCorporate />}
              />
              <Route
                path={`/authentication/signup/addindividualaccount`}
                element={<AddIndividualAccount />}
              />
              <Route
                path={`/authentication/signup/basicinfo`}
                element={<BasicInfo />}
              />
              <Route
                path={`/authentication/signup/suittestfatca`}
                element={<SuitTestFatca />}
              />
              <Route
                path={`/authentication/signup/otpemailconfirm`}
                element={<OtpEmailConfirm />}
              />
              <Route
                path={`/authentication/signup/emailconfirmsucess`}
                element={<ConfirmSuccess />}
              />
              <Route
                path={`/authentication/signup/livenessinstruction`}
                element={<LivenessInstruction />}
              />
              <Route
                path={`/authentication/signup/livenessocr`}
                element={<Liveness />}
              />
              <Route
                path={`/authentication/signup/webcaminstructions`}
                element={<CardWebcamInstructions />}
              />
              <Route
                path={`/authentication/signup/webcaminstructions`}
                element={<CardWebcamInstructions />}
              />
              <Route
                path={`/authentication/signup/cardcapture`}
                element={<IDCardCapture />}
              />
              <Route
                path={`/authentication/signup/identityverification`}
                element={<IdentityVerification />}
              />
              <Route path={`/asset/:type/:id`} element={<AssetDetails />} />
              <Route
                path={`/authentication/login/google-authen/qr`}
                element={<GoogleQr />}
              />
              <Route
                path={`/authentication/login/google-authen/verify`}
                element={<QrVerification />}
              />
              <Route path={`/invest`} element={<OrderTrade />} />
              <Route
                path={`/high-network-verification`}
                element={<VerifyHighNetwork />}
              />
              <Route path={`/portfolio`} element={<Portfolio />} />
              <Route path={`/deposite-withdraw`} element={<BankOrder />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
