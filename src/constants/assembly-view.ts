enum AssemblyView {
    REDISTRICTING = "redistricting",
    STATE_VOTER = "state-voter",
    REPRESENTATION = "representation",
}

export const SUPPORTED_ASSEMBLY_VIEWS = Object.values(AssemblyView)

export const ASSEMBLY_VIEW_TO_NAME: Record<AssemblyView, string> = {
    [AssemblyView.REDISTRICTING]: "Redistricting Control",
    [AssemblyView.STATE_VOTER]: "2020 Presidential Voter Distribution",
    [AssemblyView.REPRESENTATION]: "Representation",
}

export function isValidAssemblyView(view: string): view is AssemblyView {
    return view in ASSEMBLY_VIEW_TO_NAME
}

export default AssemblyView
