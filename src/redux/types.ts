import { IcoType } from "@/pages/landing/types";

export interface Address {
  CreatedAt: string;
  DeletedAt: string;
  id: string;
  homeNumber: string;
  villageNumber: string;
  villageName: string;
  subStreetName: string;
  streetName: string;
  subDistrictName: string;
  districtName: string;
  provinceName: string;
  zipCode: string;
  countryName: string;
  types: number;
}

export interface Bank {
  CreatedAt: string;
  DeletedAt: string;
  id: string;
  bankName: string;
  bankBranchName: string;
  bankAccountNumber: string;
  types: number;
}
export type SuitAnswer = {
  ans: number | number[];
};

export type SuitTestResultAnswer = {
  answer: { [key: string]: SuitAnswer };
};
export type NestedSuitTestResult = {
  cid: string;
  investorTypeRisk: string;
  level: number;
  totalScore: number;
  suitTestResult: SuitTestResultAnswer;
};

export interface SuiteTestResult {
  createBy: string;
  id: string;
  suiteTestResult: NestedSuitTestResult;
  isFatca: string;
  fatcaInfo: string;
  isKnowLedgeDone: string;
  knowLedgeTestResult: number;
}

export interface IndividualData {
  CreatedAt: string;
  DeletedAt: string;
  id: string;
  thTitle: string;
  thName: string;
  thSurname: string;
  engTitle: string;
  engName: string;
  engSurname: string;
  email: string;
  mobile: string;
  birthDate: string;
  marriageStatus: string;
  citizenId: string;
  laserCode: string;
  education: string;
  sourceOfIncome: string;
  currentOccupation: string;
  officeName: string;
  typeOfBusiness: string;
  positionName: string;
  salaryRange: string;
  shortTermInvestment: boolean;
  taxesInvestment: boolean;
  longTermInvestment: boolean;
  retireInvestment: boolean;
  pageId: string;
  update: string;
  SuiteTestResult: SuiteTestResult;
  address: Address[];
  bank: Bank[];
  ndid: string;
  thaid: string;
}

export interface LivenessOcr {
  faceImage: string | null;
  idCardImage: string | null;
}

export interface User {
  id: string;
  email: string;
  groups: any[];
  permissions: any[];
  roles: any[];
  userId: string;
  loginStatus: string;
  Error: string;
  exp: number;
  iat: number;
  name: string;
}

export interface Body {
  class: string;
}

export interface InitialState {
  lang: string;
  dir: string;
  dataNavLayout: string;
  class: string;
  dataHeaderStyles: string;
  dataMenuStyles: string;
  dataVerticalStyle: string;
  StylebodyBg: string;
  StyleDarkBg: string;
  toggled: string;
  dataNavStyle: string;
  horStyle: string;
  dataPageStyle: string;
  dataWidth: string;
  dataMenuPosition: string;
  dataHeaderPosition: string;
  iconOverlay: string;
  colorPrimaryRgb: string;
  colorPrimary: string;
  bodyBg: string;
  darkBg: string;
  bgImg: string;
  iconText: string;
  body: Body;
  individualData: IndividualData;
  livenessOcr: LivenessOcr;
  user: User;
  icoAll: IcoType;
  unitTest: any;
}
