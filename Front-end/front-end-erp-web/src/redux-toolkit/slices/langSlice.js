import { createSlice } from '@reduxjs/toolkit'
import Vietnamese from '../../lang/vi.json'
import English from '../../lang/en.json'

// Check persist language
let currentLanguage = 'vi'
let dataPersist = localStorage.getItem('persist:root')
if (dataPersist) {
    let dataPersistParse = JSON.parse(dataPersist)
    let userPersist = JSON.parse(dataPersistParse?.user)
    currentLanguage = userPersist?.currentLang
}

const initialState = {
    value: currentLanguage,
    message: Vietnamese
}

export const langSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        translate: (state, action) => {
            const newLocale = action.payload
            state.value = newLocale
            if (newLocale === 'en') {
                state.message = English
            } else {
                state.message = Vietnamese
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { translate } = langSlice.actions

export default langSlice.reducer