import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CompareSliceState {
    layout: Record<string, string>
}

const initialState: CompareSliceState = {
    layout: {},
}

interface SaveLayoutPayload {
    name: string
    value: string
}

export const compareSlice = createSlice({
    name: "district-plan",
    initialState,
    reducers: create => ({
        saveLayout: create.reducer(
            (state, action: PayloadAction<SaveLayoutPayload>) => {
                const { name, value } = action.payload
                state.layout[name] = value
            },
        ),
    }),
    selectors: {
        selectApp: root => root,
        selectLayout: root => root.layout,
    },
})

export const {} = compareSlice.actions

export const { selectLayout } = compareSlice.selectors

// export const selectPanel = (id: string) =>
//     createSelector([selectApp], root => root.panel_directory[id])
