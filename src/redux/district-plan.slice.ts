import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface DistrictPlanState {
    layout: Record<string, string>
}

const initialState: DistrictPlanState = {
    layout: {},
}

interface SaveLayoutPayload {
    name: string
    value: string
}

export const districtPlanSlice = createSlice({
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

export const {} = districtPlanSlice.actions

export const { selectLayout } = districtPlanSlice.selectors

// export const selectPanel = (id: string) =>
//     createSelector([selectApp], root => root.panel_directory[id])
