import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface DistrictPlanSliceState {
    district: number | undefined
}

const initialState: DistrictPlanSliceState = {
    district: undefined,
}

export const showcaseSlice = createSlice({
    name: "showcase",
    initialState,
    reducers: create => ({
        showcaseDistrict: create.reducer((state, action: PayloadAction<number>) => {
            const target = action.payload
            state.district = target
        }),
    }),
    selectors: {
        selectApp: root => root,
        selectDistrict: root => root.district,
    },
})

export const { showcaseDistrict } = showcaseSlice.actions

export const { selectApp, selectDistrict } = showcaseSlice.selectors
