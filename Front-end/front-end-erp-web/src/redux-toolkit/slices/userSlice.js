import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
}




export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLogin = true
        },
        logOut: (state, action) => {
            state.isLogin = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, logOut } = userSlice.actions

export default userSlice.reducer