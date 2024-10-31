// import reducer from "./reducer";
// import thunk from "redux-thunk";
// import { applyMiddleware, configureStore } from "@reduxjs/toolkit";

// const store = configureStore( {reducer:reducer}, applyMiddleware(thunk));

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import individualDataReducer from "./slice/fetchIndividualDataSlice";
import uploadFileReducer from "./slice/uploadFileSlice";

export const store = configureStore({
  reducer: {
    reducer: reducer,
    individualData: individualDataReducer,
    uploadfile: uploadFileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
