enum AssemblyView {
    STATE_POPULATION = "state-population",
    REDISTRICTING = "redistricting",
    STATE_VOTER = "state-voter",
    REPRESENTATION = "representation",
}

export const SUPPORTED_ASSEMBLY_VIEWS = Object.values(AssemblyView)

export const ASSEMBLY_VIEW_TO_NAME: Record<AssemblyView, string> = {
    [AssemblyView.STATE_POPULATION]: "State Population",
    [AssemblyView.REDISTRICTING]: "Redistricting Control",
    [AssemblyView.STATE_VOTER]: "State Voter Distribution",
    [AssemblyView.REPRESENTATION]: "Representative Distribution",
}

export function isValidAssemblyView(view: string): view is AssemblyView {
    return view in ASSEMBLY_VIEW_TO_NAME
}

export default AssemblyView
