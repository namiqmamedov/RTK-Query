import { duration } from '@mui/material';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const pause = (duration) => {
    return new Promise((resolve) =>{
        setTimeout(resolve,duration)
    })
}

const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:5174',
        fetchFn: async(...args)=>{
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder){ // datalari cekmek , silmek ucun .. 
         return {
            fetchUsers:builder.query({
                query:()=>{
                    return {
                        url:'/users',
                        method: 'GET'
                    }
                }
            }),
            addUser:builder.mutation({
                query:()=>{
                    return {
                        url:'/users',
                        method: 'POST',
                        body:{
                            name:"Namiq"
                        }
                    }
                }
            }),
            removeUser:builder.mutation({
                query:(user)=>{
                    return {
                        url:`/users/${user.id}`,
                        method: 'DELETE',
                        body:{
                            name:"Namiq"
                        }
                    }
                }
            })
            // datani cekmek istedikde query bir seyi silmek elave etmek mutation
         }
    }
});

export const {useFetchUsersQuery,useAddUserMutation,useRemoveUserMutation} = usersApi;
export {usersApi};