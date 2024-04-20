enum Mode {
    ASSEMBLY = "assembly",
    HEAT = "heat",
    COMPARE = "compare",
    GINGLES = "gingles",
    ECOLOGICAL_INFERENCE = "ei",
}

export const SUPPORTED_MODES = Object.values(Mode)

export const MODE_TO_NAME: Record<Mode, string> = {
    [Mode.ASSEMBLY]: "State Assembly Districts",
    [Mode.HEAT]: "Group Heat Map",
    [Mode.COMPARE]: "Compare District Plans",
    [Mode.GINGLES]: "Gingles 2/3 Analysis",
    [Mode.ECOLOGICAL_INFERENCE]: "Ecological Inference",
}

export function isValidMode(mode: string): mode is Mode {
    return mode in MODE_TO_NAME
}

export default Mode
