import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface DistrictPlanSliceState {
    district?: number
}

const initialState: DistrictPlanSliceState = {
    district: undefined,
}

export const districtPlanSlice = createSlice({
    name: "district-plan",
    initialState,
    reducers: create => ({
        showcaseDistrict: create.reducer(
            (state, action: PayloadAction<number | undefined>) => {
                const target = action.payload
                state.district = target
            },
        ),
    }),
    selectors: {
        selectApp: root => root,
        selectDistrict: root => root.district,
    },
})

export const { showcaseDistrict } = districtPlanSlice.actions

export const { selectApp, selectDistrict } = districtPlanSlice.selectors
