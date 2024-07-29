import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    currentLang: 'vi',
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    department: '',
    avatar: '',
    isShowModalInfo: false,
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
            state.department = action.payload?.department
            state.avatar = action.payload?.avatar
            state.currentLang = 'vi'
        },
        logOut: (state, action) => {
            state.isLogin = false
            state.email = ''
            state.firstName = ''
            state.lastName = ''
            state.id = ''
            state.department = ''
            state.avatar = ''
        },
        changeLanguage: (state, action) => {
            state.currentLang = action.payload
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
export const { loginSuccess, logOut, openModalProfile, closeModalProfile, changeLanguage } = userSlice.actions

export default userSlice.reducer