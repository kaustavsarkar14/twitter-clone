import { createSlice } from "@reduxjs/toolkit"

const appSlice = createSlice({
    name:"app",
    initialState : {
        isMobileNavOpen : false,
    },
    reducers: {
        openMobileNav : (state, action)=>{
            state.isMobileNavOpen = true
        },
        closeMobileNav : (state, action)=>{
            state.isMobileNavOpen = false
        },
    }
})


export const {openMobileNav,closeMobileNav} = appSlice.actions
export default appSlice.reducer