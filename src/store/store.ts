import { configureStore } from "@reduxjs/toolkit";
import {api} from "/"
export const store = configureStore({
    reducer:{

    },
    middleware:(getDeafaultMiddleware)=>
        getDeafaultMiddleware().concat(api.middleware)
})