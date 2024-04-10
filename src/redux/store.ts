import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { demographicApi } from "./demographic.api"
import { mapApi } from "./map.api"
import { representativeApi } from "./representative.api"
import { showcaseSlice } from "./showcase.slice"

const rootReducer = combineSlices(
    showcaseSlice,
    mapApi,
    representativeApi,
    demographicApi,
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
                .concat(representativeApi.middleware)
                .concat(demographicApi.middleware),
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
