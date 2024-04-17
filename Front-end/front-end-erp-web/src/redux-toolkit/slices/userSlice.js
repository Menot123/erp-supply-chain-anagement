import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    avatar: '',
    isShowModalInfo: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLogin = true
            state.email = action.payload?.email
            state.firstName = action.payload?.firstName
            state.lastName = action.payload?.lastName
            state.id = action.payload?.id
            state.avatar = action.payload?.avatar
        },
        logOut: (state, action) => {
            state.isLogin = false
            state.email = ''
            state.firstName = ''
            state.lastName = ''
            state.id = ''
            state.avatar = ''
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