import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface StateSelectionSliceState {
    useSimpleInterface: boolean
}

const SAVE_KEY = "state-selection:useSimpleInterface"
const initialState: StateSelectionSliceState = {
    useSimpleInterface: localStorage.getItem(SAVE_KEY) === "true",
}

export const stateSelectionSlice = createSlice({
    name: "state-selection",
    initialState,
    reducers: create => ({
        updateConfig: create.reducer((state, action: PayloadAction<boolean>) => {
            const newValue = action.payload
            state.useSimpleInterface = newValue
            localStorage.setItem(SAVE_KEY, newValue.toString())
        }),
    }),
    selectors: {
        selectConfig: root => root,
    },
})

export const { updateConfig } = stateSelectionSlice.actions

export const { selectConfig } = stateSelectionSlice.selectors
