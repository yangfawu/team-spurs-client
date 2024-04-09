enum Party {
    DEMOCRAT = "d",
    REPUBLICAN = "r",
    OTHER = "o",
}

export const SUPPORTED_PARTIES = Object.values(Party)

export const PARTY_TO_NAME: Record<Party, string> = {
    [Party.DEMOCRAT]: "Democrat",
    [Party.REPUBLICAN]: "Republican",
    [Party.OTHER]: "Other",
}

export default Party
