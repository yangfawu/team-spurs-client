import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CompareSliceState {
    plan: string | null
}

const initialState: CompareSliceState = {
    plan: null,
}

export const compareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: create => ({
        setPlan: create.reducer((state, action: PayloadAction<string>) => {
            state.plan = action.payload
        }),
    }),
    selectors: {
        selectPlan: root => root.plan,
    },
})

export const { setPlan } = compareSlice.actions

export const { selectPlan } = compareSlice.selectors
