enum Mode {
    DISTRICT_PLAN = "district-plan",
    MINORITY_DISTRIBUTION = "minority-distribution",
    OVERVIEW = "overview",
    COMPARE = "compare",
}

export const SUPPORTED_MODES = Object.values(Mode)

export const MODE_TO_NAME: Record<Mode, string> = {
    [Mode.DISTRICT_PLAN]: "District Plan",
    [Mode.MINORITY_DISTRIBUTION]: "Minority Distribution",
    [Mode.OVERVIEW]: "Overview",
    [Mode.COMPARE]: "Compare",
}

export function isValidMode(mode: string): mode is Mode {
    return mode in MODE_TO_NAME
}

export default Mode
