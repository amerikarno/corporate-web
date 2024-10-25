import { TIndividualData } from "@/pages/authentication/signUp/types";
import { IcoType } from "@/pages/landing/types";

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
  individualData?: TIndividualData;
  livenessOcr: LivenessOcr;
  user: User;
  icoAll: IcoType;
  unitTest: any;
}
