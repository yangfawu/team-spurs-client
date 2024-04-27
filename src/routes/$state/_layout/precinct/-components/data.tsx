import PrecinctView from "@/constants/precinct-view";
import { ElementType, lazy } from "react";

const VIEWS: Record<PrecinctView, ElementType> = {
    [PrecinctView.CHART]: lazy(() => import("./scatter-plot")),
    [PrecinctView.TABLE]: lazy(() => import("./table")),
}

export default VIEWS
