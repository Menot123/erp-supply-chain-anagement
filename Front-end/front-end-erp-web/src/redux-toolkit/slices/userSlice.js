import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    firstName: '',
    lastName: '',
    email: '',
    isShowModalInfo: false
}




export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLogin = true
            state.email = action.payload.email
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
        },
        logOut: (state, action) => {
            state.isLogin = false
        },
        openModalProfile: (state, action) => {
            state.isShowModalInfo = true
        },
        closeModalProfile: (state, action) => {
            state.isShowModalInfo = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, logOut, openModalProfile, closeModalProfile } = userSlice.actions

export default userSlice.reducer