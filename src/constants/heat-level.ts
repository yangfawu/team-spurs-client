enum HeatLevel {
    PRECINCT = "precinct",
    // CENSUS = "census",
    // COUNTY = "county",
}

export const SUPPORTED_HEAT_LEVELS = Object.values(HeatLevel)

export const HEAT_LEVEL_TO_NAME: Record<HeatLevel, string> = {
    [HeatLevel.PRECINCT]: "Precinct",
    // [HeatLevel.CENSUS]: "Census",
    // [HeatLevel.COUNTY]: "County",
}

export function isValidHeatLevel(heatLevel: string): heatLevel is HeatLevel {
    return heatLevel in HEAT_LEVEL_TO_NAME
}

export default HeatLevel
