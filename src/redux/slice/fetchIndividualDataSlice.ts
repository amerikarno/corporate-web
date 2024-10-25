import { TIndividualData } from "@/pages/authentication/signUp/constant/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SuitState = {
  individualDatas: TIndividualData | null;
};

const initialState: SuitState = {
  individualDatas: null,
};

const suitSlice = createSlice({
  name: "individualData",
  initialState,
  reducers: {
    setIndividualData: (state, action: PayloadAction<TIndividualData>) => {
      state.individualDatas = action.payload;
    },
    clearIndividualData: (state) => {
      state.individualDatas = null;
    },
    setEmailIndividualData: (state, action: PayloadAction<string>) => {
      if (state.individualDatas) {
        state.individualDatas.email = action.payload;
      }
    },
    setMobileIndividualData: (state, action: PayloadAction<string>) => {
      if (state.individualDatas) {
        state.individualDatas.mobile = action.payload;
      }
    },
  },
});

export const {
  setIndividualData,
  clearIndividualData,
  setEmailIndividualData,
  setMobileIndividualData,
} = suitSlice.actions;
export default suitSlice.reducer;
