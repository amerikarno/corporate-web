import { TIndividualData } from "@/pages/authentication/addIndividualAccount/types";
import { Dispatch } from "redux";

export const ThemeChanger = (value: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: "ThemeChanger",
    payload: value,
  });
};

export const setCid = (cid: string) => {
  return {
    type: "setCid",
    payload: cid,
  };
};

export const setIndividualEmail = (email: string) => {
  return {
    type: "setIndividualEmail",
    payload: email,
  };
};

export const setIndividualMobile = (mobile: string) => {
  return {
    type: "setIndividualMobile",
    payload: mobile,
  };
};

export const clearAddIndividual = () => {
  return {
    type: "clearAddIndividual",
  };
};

export const setFaceImage = (faceImage: string | null) => {
  return {
    type: "setFaceImage",
    payload: faceImage,
  };
};

export const setIdCardImage = (idCardImage: string | null) => {
  return {
    type: "setIdCardImage",
    payload: idCardImage,
  };
};

export const setAuthenToken = (token: string) => {
  return {
    type: "setAuthenToken",
    payload: token,
  };
};

export const setAuthenUser = (user: any) => {
  return {
    type: "setAuthenUser",
    payload: user,
  };
};

export const setAuthenEmail = (email: string) => {
  return {
    type: "setAuthenEmail",
    payload: email,
  };
};

export const setTestCorporateData = (data: any) => {
  return {
    type: "setTestCorporateData",
    payload: data,
  };
};

export const clearTestCorporateData = () => {
  return {
    type: "clearTestCorporateData",
    payload: null,
  };
};

export const initIndividualData = (data: TIndividualData) => {
  return {
    type: "initIndividualData",
    payload: data,
  };
};

export const clearIndividualData = () => {
  return {
    type: "clearIndividualData",
    payload: null,
  };
};
