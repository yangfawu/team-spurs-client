import { createSlice } from "@reduxjs/toolkit"

export interface MinorityDistributionSliceState {}

const initialState: MinorityDistributionSliceState = {}

export const minorityDistributionSlice = createSlice({
    name: "minority-distribution",
    initialState,
    reducers: create => ({}),
    selectors: {
        selectApp: root => root,
        // selectLayout: root => root.layout,
    },
})

export const {} = minorityDistributionSlice.actions

export const { selectApp } = minorityDistributionSlice.selectors
