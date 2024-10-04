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

  individualData: {
    CreatedAt: "",
    DeletedAt: "",
    id: "",
    thTitle: "",
    thName: "",
    thSurname: "",
    engTitle: "",
    engName: "",
    engSurname: "",
    email: "",
    mobile: "",
    birthDate: "",
    marriageStatus: "",
    citizenId: "",
    laserCode: "",
    education: "",
    sourceOfIncome: "",
    currentOccupation: "",
    officeName: "",
    typeOfBusiness: "",
    positionName: "",
    salaryRange: "",
    shortTermInvestment: false,
    taxesInvestment: false,
    longTermInvestment: false,
    retireInvestment: false,
    pageId: "",
    update: "",
    SuiteTestResult: {
      createBy: "",
      id: "",
      suiteTestResult: {
        cid: "",
        investorTypeRisk: "",
        level: 0,
        totalScore: 0,
        suitTestResult: {
          answer: {},
        },
      },
      isFatca: "",
      fatcaInfo: "",
      isKnowLedgeDone: "",
      knowLedgeTestResult: 0,
    },
    address: [
      {
        CreatedAt: "",
        DeletedAt: "",
        id: "",
        homeNumber: "",
        villageNumber: "",
        villageName: "",
        subStreetName: "",
        streetName: "",
        subDistrictName: "",
        districtName: "",
        provinceName: "",
        zipCode: "",
        countryName: "",
        types: 0,
      },
    ],
    bank: [
      {
        CreatedAt: "",
        DeletedAt: "",
        id: "",
        bankName: "",
        bankBranchName: "",
        bankAccountNumber: "",
        types: 0,
      },
    ],
    ndid: "",
    thaid: "",
  },

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

    ////////////////////AddIndividual//////////////////////
    case "initIndividualData":
      return {
        ...state,
        individualDatas: { ...state.individualData, ...payload },
      };
    case "clearAddIndividual":
      return { ...state, addIndividual: initialState.individualData };
    /////////////////////////////////////////////////////////

    ////////////////////livenessOcr//////////////////////
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

    //////////////////// login //////////////////////
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
    /////////////////////////////////////////////////////
    default:
      return state;
  }
}
