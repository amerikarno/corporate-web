let initialState = {
        lang: "en",
        dir: "ltr",
        dataNavLayout: "vertical",
        class: "light",
        dataHeaderStyles: "light",
        dataMenuStyles: "dark",
        dataVerticalStyle: "overlay",
        StylebodyBg:"107 64 64",
        StyleDarkBg:"93 50 50",
        toggled:"closed",
        dataNavStyle:"",
        horStyle:"",
        dataPageStyle:"regular",
        dataWidth:"fullwidth",
        dataMenuPosition:"fixed",
        dataHeaderPosition:"fixed",
        iconOverlay:"",
        colorPrimaryRgb:"",
        colorPrimary:"",
        bodyBg:"",
        darkBg:"",
        bgImg:"",
        iconText:"",
        body:{
            class:""
        },

        addIndividual: {
          cid: "",
          thTitle: "",
          thName: "",
          thSurname: "",
          engTitle: "",
          engName: "",
          engSurname: "",
          email: "",
          mobile: "",
          birthDate: "",
          mariageStatus: "",
          citizenId: "",
          laserCode: "",
        },

        livenessOcr:{
          faceImage: null,
          idCardImage: null,
        }


      };

export default function reducer(state = initialState, action:any) {
  let { type, payload } = action;

  switch (type) {

    case "ThemeChanger":
      state = payload
      return state

    ////////////////////AddIndividual//////////////////////
    case "setCid":
      return { ...state, addIndividual: { ...state.addIndividual, cid: payload } };
    case "setIndividualEmail":
      return { ...state, addIndividual: { ...state.addIndividual, email: payload } };
  
    case "setIndividualMobile":
      return { ...state, addIndividual: { ...state.addIndividual, mobile: payload } };
  
    case "clearAddIndividual":
      return { ...state, addIndividual: initialState.addIndividual };
    /////////////////////////////////////////////////////////

    ////////////////////livenessOcr//////////////////////
    case "setFaceImage":
      return {...state, livenessOcr: {...state.livenessOcr, faceImage: payload}};
    case "setIdCardImage":
      return {...state, livenessOcr: {...state.livenessOcr, idCardImage: payload}};
    /////////////////////////////////////////////////////
    default:
      return state;
  }
}