enum State {
    NJ = "nj",
    VA = "va",
}

export const SUPPORTED_STATES = Object.values(State)

export const STATE_TO_NAME: Record<State, string> = {
    [State.NJ]: "New Jersey",
    [State.VA]: "Virginia",
}

export function isValidState(state: string): state is State {
    return state in STATE_TO_NAME
}

export default State
