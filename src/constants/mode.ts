enum Mode {
    ASSEMBLY = "assembly",
    HEAT = "heat",
    COMPARE = "compare",
    PRECINCT = "precinct",
    ECOLOGICAL_INFERENCE = "ei",
}

export const SUPPORTED_MODES = Object.values(Mode)

export const MODE_TO_NAME: Record<Mode, string> = {
    [Mode.ASSEMBLY]: "State Assembly Districts",
    [Mode.HEAT]: "Group Heat Map",
    [Mode.COMPARE]: "Compare District Plans",
    [Mode.PRECINCT]: "Precinct Analysis",
    [Mode.ECOLOGICAL_INFERENCE]: "Ecological Inference",
}

export const MODE_DESCRIPTIONS: Record<Mode, string> = {
    [Mode.ASSEMBLY]: "View the state assembly districts of this state and summary of its other statistics.",
    [Mode.HEAT]: "View a heat map of the state based on a selected group.",
    [Mode.COMPARE]: "Compare the currently enacted district plan in this state with a randomly generated plan.",
    [Mode.PRECINCT]: "View the Precinct Analysis of this state based on a selected group.",
    [Mode.ECOLOGICAL_INFERENCE]: "View the Ecological Inference of this state's elections based on a selected group.",
}

export function isValidMode(mode: string): mode is Mode {
    return mode in MODE_TO_NAME
}

export default Mode
