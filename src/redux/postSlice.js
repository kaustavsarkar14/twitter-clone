import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name:"posts",
    initialState : {
        allPosts: [],
        isPostsLoading : true,
    },
    reducers: {
        addPosts : (state, action)=>{
            state.allPosts = action.payload
            state.isPostsLoading = false
        },
    }
})


export const {addPosts} = postSlice.actions
export default postSlice.reducer