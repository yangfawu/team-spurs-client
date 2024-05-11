enum Party {
    DEMOCRATIC = "d",
    REPUBLICAN = "r",
    OTHER = "o",
}

export const SUPPORTED_PARTIES = Object.values(Party)

export const PARTY_TO_NAME: Record<Party, string> = {
    [Party.DEMOCRATIC]: "Democratic",
    [Party.REPUBLICAN]: "Republican",
    [Party.OTHER]: "Other",
}

export function isValidParty(party: string): party is Party {
    return party in PARTY_TO_NAME
}

export default Party
