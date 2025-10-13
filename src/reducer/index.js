import { combineReducers } from "@reduxjs/toolkit"

import monolopyGameSlice from "../slices/monolopyGameSlice"
import simsGameSlice from "../slices/simsGameSlice"

const rootReducer = combineReducers({
  monolopyGame: monolopyGameSlice,
  simsGame: simsGameSlice,
})

export default rootReducer
