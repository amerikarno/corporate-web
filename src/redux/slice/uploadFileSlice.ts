import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TUploadFile = {
  file: string | null;
};
const initialState: TUploadFile = {
  file: null,
};

const uploadFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    setUploadFile: (state, action: PayloadAction<string | null>) => {
      state.file = action.payload;
    },
  },
});

export const { setUploadFile } = uploadFileSlice.actions;
export default uploadFileSlice.reducer;
