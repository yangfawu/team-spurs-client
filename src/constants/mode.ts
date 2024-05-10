enum Mode {
    SUMMARY = "summary",
    RACIAL = "racial",
    PLAN = "plan",
    PRECINCT = "precinct"
}

export const SUPPORTED_MODES = Object.values(Mode)

export const MODE_TO_NAME: Record<Mode, string> = {
    [Mode.SUMMARY]: "State Data Summary",
    [Mode.RACIAL]: "Racial Fairness Analysis",
    [Mode.PLAN]: "District Plan Analysis",
    [Mode.PRECINCT]: "Precinct Analysis",
}

export const MODE_DESCRIPTIONS: Record<Mode, string> = {
    [Mode.SUMMARY]: "View the state assembly districts of this state and summary of its other statistics.",
    [Mode.RACIAL]: "View a heat map of the state based on a selected group.",
    [Mode.PLAN]: "Compare the currently enacted district plan in this state with a randomly generated plan.",
    [Mode.PRECINCT]: "View the Precinct Analysis of this state based on a selected group.",
}

export function isValidMode(mode: string): mode is Mode {
    return mode in MODE_TO_NAME
}

export default Mode
