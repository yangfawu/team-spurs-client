enum PrecinctView {
    CHART = "chart",
    TABLE = "table",
}

export const SUPPORTED_PRECINCT_VIEWS = Object.values(PrecinctView)

export const PRECINCT_VIEW_TO_NAME: Record<PrecinctView, string> = {
    [PrecinctView.CHART]: "Chart View",
    [PrecinctView.TABLE]: "Tabular View",
}

export function isValidPrecinctView(view: string): view is PrecinctView {
    return view in PRECINCT_VIEW_TO_NAME
}

export default PrecinctView
