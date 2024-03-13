import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface MinorityDistributionSliceState {
    layout: Record<string, string>
}

const initialState: MinorityDistributionSliceState = {
    layout: {},
}

interface SaveLayoutPayload {
    name: string
    value: string
}

export const minorityDistributionSlice = createSlice({
    name: "minority-distribution",
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

export const {} = minorityDistributionSlice.actions

export const { selectLayout } = minorityDistributionSlice.selectors

// export const selectPanel = (id: string) =>
//     createSelector([selectApp], root => root.panel_directory[id])
