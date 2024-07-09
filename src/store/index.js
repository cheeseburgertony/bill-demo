import { configureStore } from "@reduxjs/toolkit"
import billReducer from './modules/billStore.js'

const store = configureStore({
  reducer: {
    bill: billReducer
  }
})

export default store