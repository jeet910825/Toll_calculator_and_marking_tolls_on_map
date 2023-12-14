import { configureStore } from '@reduxjs/toolkit'
import searchSlice from '../../features/searchSlice'
import tollSlice from '../../features/tollDataSlice'

export const store = configureStore({
  reducer: {
    locations:searchSlice,
    tollData:tollSlice
  },
})