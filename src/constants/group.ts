enum Group {
    AMERICAN_INDIAN_ALASKA_NATIVE = "american_indian_alaska_native",
    ASIAN = "asian",
    BLACK = "black",
    HAWAIIAN_PACIFIC_ISLANDER = "hawaiian_pacific_islander",
    HISPANIC_LATINO = "hispanic_latino",
    MIXED = "mixed",
    OTHER = "other",
    WHITE = "white",
}

export const SUPPORTED_GROUPS = Object.values(Group)

export const GROUP_TO_NAME: Record<Group, string> = {
    [Group.AMERICAN_INDIAN_ALASKA_NATIVE]: "American Indian/Alaska Native",
    [Group.ASIAN]: "Asian",
    [Group.BLACK]: "Black",
    [Group.HAWAIIAN_PACIFIC_ISLANDER]: "Hawaiian/Pacific Islander",
    [Group.HISPANIC_LATINO]: "Hispanic/Latino",
    [Group.MIXED]: "Mixed",
    [Group.OTHER]: "Other",
    [Group.WHITE]: "White",
}

export const GROUP_TO_ABBREV: Record<Group, string> = {
    [Group.WHITE]: "WH",
    [Group.BLACK]: "BL",
    [Group.ASIAN]: "AS",
    [Group.HISPANIC_LATINO]: "HL",
    [Group.AMERICAN_INDIAN_ALASKA_NATIVE]: "AI",
    [Group.HAWAIIAN_PACIFIC_ISLANDER]: "HP",
    [Group.MIXED]: "MX",
    [Group.OTHER]: "OT",
}

export default Group
