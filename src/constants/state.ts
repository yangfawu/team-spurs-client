enum State {
    NJ = "nj",
    VA = "va",
}

export const SUPPORTED_STATES = Object.values(State)

export const STATE_TO_NAME: Record<State, string> = {
    [State.NJ]: "New Jersey",
    [State.VA]: "Virginia",
}

export default State
