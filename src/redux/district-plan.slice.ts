import { createSlice } from "@reduxjs/toolkit"

export interface DistrictPlanSliceState {}

const initialState: DistrictPlanSliceState = {}

export const districtPlanSlice = createSlice({
    name: "district-plan",
    initialState,
    reducers: create => ({}),
    selectors: {
        selectApp: root => root,
        // selectLayout: root => root.layout,
    },
})

export const {} = districtPlanSlice.actions

export const { selectApp } = districtPlanSlice.selectors
