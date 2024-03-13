import type { Entries } from "type-fest"

export const SUPPORTED_STATE_DIRECTORY = {
    nj: "New Jersey",
    va: "Virginia",
}
Object.freeze(SUPPORTED_STATE_DIRECTORY)

export const SUPPORTED_STATE_ENTRIES = Object.entries(
    SUPPORTED_STATE_DIRECTORY,
) as Entries<typeof SUPPORTED_STATE_DIRECTORY>
Object.freeze(SUPPORTED_STATE_ENTRIES)

export type SupportedStateKey = keyof typeof SUPPORTED_STATE_DIRECTORY
