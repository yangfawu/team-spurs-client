import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { compareSlice } from "./compare.slice"
import { distributionApi } from "./distribution.api"
import { districtPlanSlice } from "./district-plan.slice"
import { mapApi } from "./map.api"
import { minorityDistributionSlice } from "./minority-dsitribution.slice"
import { overviewSlice } from "./overview.slice"
import { repsApi } from "./reps.api"

const rootReducer = combineSlices(
    compareSlice,
    districtPlanSlice,
    minorityDistributionSlice,
    overviewSlice,
    mapApi,
    repsApi,
    distributionApi,
    /* insert more slices later */
)

export type RootState = ReturnType<typeof rootReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: builder =>
            builder({ serializableCheck: false }) //
                .concat(mapApi.middleware)
                .concat(repsApi.middleware)
                .concat(distributionApi.middleware),
    })
    setupListeners(store.dispatch)
    return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = typeof store

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]

export type AppThunk<T = void> = ThunkAction<T, RootState, unknown, Action>
