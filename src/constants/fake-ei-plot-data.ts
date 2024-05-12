import Group from "./group"
import State from "./state"

interface EcologicalInferencePlot {
    state: State
    group: Group
    candidate: string
    min: number
    max: number
    data: Array<{
        key: string
        values: Record<string, number>
    }>
}
export const EI_PLOT_DATA: EcologicalInferencePlot = {
    state: State.VA,
    group: Group.WHITE,
    candidate: "biden",
    min: 0,
    max: 200,
    data: [
        {
            key: "whites",
            values: {
                "72": 0.030916666666666665,
                "73": 0.7843333333333333,
                "74": 0.18458333333333332,
                "75": 0.00016666666666666666,
            },
        },
        {
            key: "non-whites",
            values: {
                "183": 0.0003333333333333333,
                "184": 0.03975,
                "185": 0.40575,
                "186": 0.4920833333333333,
                "187": 0.062,
                "188": 8.333333333333333e-5,
            },
        },
    ],
}
