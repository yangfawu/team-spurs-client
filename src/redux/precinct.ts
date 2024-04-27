import Group from "@/constants/group"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface PrecinctSliceState {
    group: Group
    election: string
    precinct: string | null
}

const initialState: PrecinctSliceState = {
    group: Group.WHITE,
    election: "2020-presidential",
    precinct: null,
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
    }),
    selectors: {
        selectGroup: root => root.group,
        selectElection: root => root.election,
        selectPrecinct: root => root.precinct,
    },
})

export const { setGroup, setElection, setPrecinct, clearPrecinct } = precinctSlice.actions

export const { selectGroup, selectElection, selectPrecinct } = precinctSlice.selectors
