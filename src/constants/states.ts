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

interface LeafletCoordinate {
    readonly center: [number, number]
    zoom: number
}
export const LEAFLET_COORDINATES = new Map<
    SupportedStateKey,
    LeafletCoordinate
>([
    ["nj", { center: [40.1907, -74.6728], zoom: 8 }],
    ["va", { center: [37.5215, -78.8537], zoom: 7 }],
])
Object.freeze(LEAFLET_COORDINATES)
