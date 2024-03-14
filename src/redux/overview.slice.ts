import { createSlice } from "@reduxjs/toolkit"

export interface OverviewSliceState {}

const initialState: OverviewSliceState = {}

export const overviewSlice = createSlice({
    name: "overview",
    initialState,
    reducers: create => ({}),
    selectors: {
        selectApp: root => root,
        // selectLayout: root => root.layout,
    },
})

export const {} = overviewSlice.actions

export const { selectApp } = overviewSlice.selectors
