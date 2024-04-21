import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

interface RedistricitngInfo {
    state: State
    name: string
    website: string
    comments: string
}

const NAME = "assembly"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${NAME}`

export function fetchRedistrictingInfo(state: State) {
    return queryOptions<RedistricitngInfo>({
        queryKey: [NAME, "fetchRedistrictingInfo", state],
        queryFn: async ({ signal }) => {
            return {
                state,
                name: "Virginia Redistricting Commission",
                website: "https://www.virginiaredistricting.org/",
                comments: `The Virginia Redistricting Commission, established by a constitutional amendment approved in 2020, is responsible for drawing electoral district boundaries for the United States House of Representatives, as well as the Senate and House of Delegates of the General Assembly. The Commission comprises 16 members, including eight legislative members—four from the Senate and four from the House of Delegates—appointed based on party representation, and eight citizen members selected according to state law. This bipartisan Commission aims to ensure fairness and transparency in the redistricting process.`,
            }
            // TODO: uncomment when endpoint is ready
            // const res = await fetch(`${BASE_URL}/redistricting/${state}`, { signal })
            // const data: RedistricitngInfo = await res.json()
            // return data
        },
    })
}
