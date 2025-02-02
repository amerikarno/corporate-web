import { Dispatch } from 'redux';

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