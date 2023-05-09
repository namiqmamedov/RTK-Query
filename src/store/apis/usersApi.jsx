import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {faker} from '@faker-js/faker'


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
                providesTags: ['User'],
                query:()=>{
                    return {
                        url:'/users',
                        method: 'GET'
                    }
                }
            }),
            addUser:builder.mutation({
                invalidatesTags:()=>{
                    return [{type:'User'}]
                }, // her defe yeniden datani cekir refreshlenmeden
                  // datani gostermesi ucun
                query:()=>{
                    return {
                        url:'/users',
                        method: 'POST',
                        body:{
                            name: faker.name.fullName()
                        }
                    }
                }
            }),
            removeUser:builder.mutation({
                invalidatesTags:()=>{
                    return [{type:'User'}]
                },
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