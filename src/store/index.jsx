import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "./apis/usersApi";
import { albumsApi } from "./apis/albumsApi";

export const store = configureStore({
    reducer:{
        [usersApi.reducerPath]:usersApi.reducer,
        [albumsApi.reducerPath]:albumsApi.reducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(usersApi.middleware).concat(albumsApi.middleware)
    }
})

setupListeners(store.dispatch);

export {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation
} from './apis/albumsApi'

export {
    useFetchUsersQuery,
    useAddUserMutation,
    useRemoveUserMutation
} from './apis/usersApi'