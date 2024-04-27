import Group from "@/constants/group"
import PrecinctView from "@/constants/precinct-view"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface PrecinctSliceState {
    group: Group
    election: string
    precinct: string | null
    view: PrecinctView
}

const initialState: PrecinctSliceState = {
    group: Group.WHITE,
    election: "2020-presidential",
    precinct: null,
    view: PrecinctView.CHART,
}

export const precinctSlice = createSlice({
    name: "precinct",
    initialState,
    reducers: create => ({
        setGroup: create.reducer((state, action: PayloadAction<Group>) => {
            state.group = action.payload
        }),
        setElection: create.reducer((state, action: PayloadAction<string>) => {
            state.election = action.payload
        }),
        setPrecinct: create.reducer((state, action: PayloadAction<string>) => {
            state.precinct = action.payload
        }),
        clearPrecinct: create.reducer(state => {
            state.precinct = null
        }),
        setView: create.reducer((state, action: PayloadAction<PrecinctView>) => {
            state.view = action.payload
        }),
    }),
    selectors: {
        selectGroup: root => root.group,
        selectElection: root => root.election,
        selectPrecinct: root => root.precinct,
        selectView: root => root.view,
    },
})

export const { setGroup, setElection, setPrecinct, clearPrecinct, setView } = precinctSlice.actions

export const { selectGroup, selectElection, selectPrecinct, selectView } = precinctSlice.selectors
