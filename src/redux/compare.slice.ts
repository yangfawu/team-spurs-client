import { createSlice } from "@reduxjs/toolkit"

export interface CompareSliceState {}

const initialState: CompareSliceState = {}

export const compareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: create => ({}),
    selectors: {
        selectApp: root => root,
        // selectLayout: root => root.layout,
    },
})

export const {} = compareSlice.actions

export const { selectApp } = compareSlice.selectors
