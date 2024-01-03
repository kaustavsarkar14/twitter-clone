import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name:"posts",
    initialState : {
        allPosts: []
    },
    reducers: {
        addPosts : (state, action)=>{
            state.allPosts = action.payload
        },
    }
})


export const {addPosts} = postSlice.actions
export default postSlice.reducer