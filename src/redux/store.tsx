// import reducer from "./reducer";
// import thunk from "redux-thunk";
// import { applyMiddleware, configureStore } from "@reduxjs/toolkit";

// const store = configureStore( {reducer:reducer}, applyMiddleware(thunk));

// export default store;

import reducer from "./reducer";

import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
