
// import { configureStore } from '@redux'
import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counter'
import { authotizedSlice } from './slices/authorized'
import { adminSlice } from './slices/admin/adminSlice';

export const storeRedux = configureStore ( {

    reducer: {

        counter: counterSlice.reducer,
        authorized: authotizedSlice.reducer,
        admin: adminSlice.reducer,

    },
    
})

