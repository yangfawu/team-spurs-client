import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface OverviewSliceState {
    layout: Record<string, string>
}

const initialState: OverviewSliceState = {
    layout: {},
}

interface SaveLayoutPayload {
    name: string
    value: string
}

export const overviewSlice = createSlice({
    name: "overview",
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

export const {} = overviewSlice.actions

export const { selectLayout } = overviewSlice.selectors

// export const selectPanel = (id: string) =>
//     createSelector([selectApp], root => root.panel_directory[id])
