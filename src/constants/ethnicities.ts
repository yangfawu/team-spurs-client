import { Entries } from "type-fest"

export const SUPPORTED_ETHNICITY_DIRECTORY = {
    white: "White/Caucasian",
    black: "Black/African American",
    asian: "Asian",
    hl: "Hispanic/Latino",
    aian: "American Indian/Alaska Native",
    hpi: "Native Hawaiian/Pacific Islander",
    other: "Other",
    mixed: "Mixed",
}
Object.freeze(SUPPORTED_ETHNICITY_DIRECTORY)

export const SUPPORTED_ETHNICITY_ENTRIES = Object.entries(
    SUPPORTED_ETHNICITY_DIRECTORY,
) as Entries<typeof SUPPORTED_ETHNICITY_DIRECTORY>
Object.freeze(SUPPORTED_ETHNICITY_ENTRIES)

export type SupportedEthnicityKey = keyof typeof SUPPORTED_ETHNICITY_DIRECTORY
