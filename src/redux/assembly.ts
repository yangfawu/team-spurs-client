import AssemblyView from "@/constants/assembly-view"
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
    summary: {
        modules: AssemblyView[]
    }
}

const initialState: AssemblySliceState = {
    district: null,
    legislature: {
        parties: [],
        groups: [],
    },
    summary: {
        modules: [AssemblyView.STATE_POPULATION, AssemblyView.REPRESENTATION],
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
        resetFilters: create.reducer(state => {
            state.legislature.groups = []
            state.legislature.parties = []
        }),
        setActiveModules: create.reducer((state, action: PayloadAction<AssemblyView[]>) => {
            state.summary.modules = action.payload
        }),
    }),
    selectors: {
        selectDistrict: root => root.district,
        selectLegislature: root => root.legislature,
        selectSummary: root => root.summary,
        selectActiveModules: root => root.summary.modules,
    },
})

export const { showcaseDistrict, clearDistrict, setGroupFilter, setPartyFilter, setActiveModules, resetFilters } =
    assemblySlice.actions

export const { selectDistrict, selectLegislature, selectActiveModules, selectSummary } = assemblySlice.selectors
