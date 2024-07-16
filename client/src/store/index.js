import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './slicer/dataSlicer'

export default configureStore({
    reducer: {
        items: dataReducer
    }
})