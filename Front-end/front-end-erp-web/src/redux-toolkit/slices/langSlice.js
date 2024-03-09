import { createSlice } from '@reduxjs/toolkit'
import Vietnamese from '../../lang/vi.json'
import English from '../../lang/en.json'

const initialState = {
    value: 'vi',
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