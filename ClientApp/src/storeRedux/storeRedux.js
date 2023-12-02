
// import { configureStore } from '@redux'
import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counter'
import { authotizedSlice } from './slices/authorized'

export const storeRedux = configureStore ( {

    reducer: {

        counter: counterSlice.reducer,
        authorized: authotizedSlice.reducer,


    },
    
})

