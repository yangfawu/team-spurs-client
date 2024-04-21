import Group from "@/constants/group"
import Party from "@/constants/party"
import State from "@/constants/state"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AssemblySliceState {
    district: {
        state: State
        id: number
    } | null
    legislature: {
        parties: Party[]
        groups: Group[]
    }
}

const initialState: AssemblySliceState = {
    district: null,
    legislature: {
        parties: [],
        groups: [],
    },
}

export const assemblySlice = createSlice({
    name: "assembly",
    initialState,
    reducers: create => ({
        showcaseDistrict: create.reducer((state, action: PayloadAction<{ state: State; id: number }>) => {
            state.district = action.payload
        }),
        clearDistrict: create.reducer(state => {
            state.district = null
        }),
        setPartyFilter: create.reducer((state, action: PayloadAction<Party[]>) => {
            state.legislature.parties = action.payload
        }),
        setGroupFilter: create.reducer((state, action: PayloadAction<Group[]>) => {
            state.legislature.groups = action.payload
        }),
    }),
    selectors: {
        selectDistrict: root => root.district,
        selectLegislature: root => root.legislature,
    },
})

export const { showcaseDistrict, clearDistrict, setGroupFilter, setPartyFilter } = assemblySlice.actions

export const { selectDistrict, selectLegislature } = assemblySlice.selectors
