import Group from "@/constants/group"
import HeatLevel from "@/constants/heat-level"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface HeatSliceState {
    group: Group
    level: HeatLevel
    modal: {
        title: string
        breakdown: Record<Group, number>
    } | null
}

const initialState: HeatSliceState = {
    group: Group.WHITE,
    level: HeatLevel.PRECINCT,
    modal: null,
}

export const heatSlice = createSlice({
    name: "heat",
    initialState,
    reducers: create => ({
        setGroup: create.reducer((state, action: PayloadAction<Group>) => {
            state.group = action.payload
        }),
        setLevel: create.reducer((state, action: PayloadAction<HeatLevel>) => {
            state.level = action.payload
        }),
        featureDemographic: create.reducer((state, action: PayloadAction<HeatSliceState["modal"]>) => {
            state.modal = action.payload
        }),
        unfeatureDemographic: create.reducer(state => {
            state.modal = null
        }),
    }),
    selectors: {
        selectGroup: root => root.group,
        selectLevel: root => root.level,
        selectModal: root => root.modal,
    },
})

export const { setGroup, setLevel, featureDemographic, unfeatureDemographic } = heatSlice.actions

export const { selectGroup, selectLevel, selectModal } = heatSlice.selectors
