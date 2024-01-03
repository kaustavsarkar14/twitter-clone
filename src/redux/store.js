import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice"
import appSlice from "./appSlice"
const store = configureStore({
    reducer : {
        posts : postSlice,
        app: appSlice
    }
})


export default store