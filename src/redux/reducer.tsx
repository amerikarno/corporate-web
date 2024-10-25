import { InitialState } from "./types";

let initialState: InitialState = {
  lang: "en",
  dir: "ltr",
  dataNavLayout: "vertical",
  class: "light",
  dataHeaderStyles: "light",
  dataMenuStyles: "dark",
  dataVerticalStyle: "overlay",
  StylebodyBg: "107 64 64",
  StyleDarkBg: "93 50 50",
  toggled: "closed",
  dataNavStyle: "",
  horStyle: "",
  dataPageStyle: "regular",
  dataWidth: "fullwidth",
  dataMenuPosition: "fixed",
  dataHeaderPosition: "fixed",
  iconOverlay: "",
  colorPrimaryRgb: "",
  colorPrimary: "",
  bodyBg: "",
  darkBg: "",
  bgImg: "",
  iconText: "",
  body: {
    class: "",
  },

  // individualData: {
  //   id: "",
  //   createBy: "",
  //   CreatedAt: "",
  //   DeletedAt: null,
  //   registerId: "",
  //   thTitle: "",
  //   thName: "",
  //   thSurname: "",
  //   engTitle: "",
  //   engName: "",
  //   engSurname: "",
  //   email: "",
  //   mobile: "",
  //   agreement: true,
  //   birthDate: "",
  //   marriageStatus: "",
  //   citizenId: "",
  //   laserCode: "",
  //   address: [],
  //   bank: [],
  //   SuiteTestResult: {
  //     createBy: "",
  //     deletedBy: "",
  //     registerId: "",
  //     suiteTestResult: {
  //       registerId: "",
  //       investorTypeRisk: "",
  //       level: 0,
  //       totalScore: 0,
  //       suiteTestResult: {
  //         answer: {},
  //       },
  //     },
  //     isFatca: false,
  //     fatcaInfo: null,
  //     isKnowLedgeDone: false,
  //     knowLedgeTestResult: 0,
  //   },
  //   ndid: false,
  //   thaid: false,
  // },
  individualData: undefined,

  livenessOcr: {
    faceImage: null,
    idCardImage: null,
  },

  user: {
    id: "",
    email: "",
    groups: [],
    permissions: [],
    roles: [],
    userId: "",
    loginStatus: "",
    Error: "",
    exp: 0,
    iat: 0,
    name: "",
  },

  icoAll: {},

  unitTest: null,
};

export default function reducer(state = initialState, action: any) {
  let { type, payload } = action;

  switch (type) {
    case "ThemeChanger":
      state = payload;
      return state;

    //////////////////// unit test //////////////////////
    case "setTestCorporateData":
      return {
        ...state,
        unitTest: payload,
      };
    case "clearTestCorporateData":
      return {
        ...state,
        unitTest: null,
      };
    /////////////////////////////////////////////////////////

    ////////////////////AddIndividual///////////////////////
    case "initIndividualData":
      return {
        ...state,
        individualDatas: payload,
      };
    case "clearAddIndividual":
      return { ...state, addIndividual: initialState.individualData };
    /////////////////////////////////////////////////////////

    ////////////////////livenessOcr/////////////////////////
    case "setFaceImage":
      return {
        ...state,
        livenessOcr: { ...state.livenessOcr, faceImage: payload },
      };
    case "setIdCardImage":
      return {
        ...state,
        livenessOcr: { ...state.livenessOcr, idCardImage: payload },
      };
    /////////////////////////////////////////////////////

    //////////////////// login /////////////////////////
    case "setAuthenToken":
      return {
        ...state,
        token: payload,
      };
    case "setAuthenUser":
      return {
        ...state,
        user: payload,
      };
    case "setAuthenEmail":
      return {
        ...state,
        user: { ...state.user, email: payload },
      };
    //////////////////////////////////////////////////////////

    //////////////////////// ico /////////////////////////////
    case "setAllIcoStore":
      return {
        ...state,
        icoAll: payload,
      };
    //////////////////////////////////////////////////////////

    //////////////////////// create account /////////////////////////
    case "setPreInfo":
      return {
        ...state,
        individualData: { ...state.individualData, ...payload },
      };

    case "setBasicInfo":
      console.log("setBasicInfo", payload);
      const st = { ...state };
      let basicInfo = { ...st.individualData };
      basicInfo.address = payload.addresses;
      basicInfo.bank = payload.banks;
      basicInfo.pageId = payload.pageId;
      basicInfo.shortTermInvestment = payload.investment.shortTermInvestment;
      basicInfo.taxesInvestment = payload.investment.taxesInvestment;
      basicInfo.longTermInvestment = payload.investment.longTermInvestment;
      basicInfo.retireInvestment = payload.investment.retireInvestment;
      basicInfo.education = payload.occupation.education;
      basicInfo.sourceOfIncome = payload.occupation.sourceOfIncome;
      basicInfo.currentOccupation = payload.occupation.currentOccupation;
      basicInfo.officeName = payload.occupation.officeName;
      basicInfo.typeOfBusiness = payload.occupation.typeOfBusiness;
      basicInfo.positionName = payload.occupation.positionName;
      basicInfo.salaryRange = payload.occupation.salaryRange;
      console.log("basicInfo state", basicInfo);
      return {
        ...state,
        individualData: basicInfo,
      };

    case "setSuitFatca":
      const suit = { ...state.individualData, ...payload };
      console.log("setSuitFatca", suit);
      return {
        ...state,
        individualData: { ...state.individualData, ...payload },
      };
    //////////////////////////////////////////////////////////
    default:
      return state;
  }
}
