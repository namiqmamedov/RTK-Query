import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {faker} from '@faker-js/faker'


const pause = (duration) => {
    return new Promise((resolve) =>{
        setTimeout(resolve,duration)
    })
}

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:5174',
        fetchFn: async(...args)=>{
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder){ // datalari cekmek , silmek ucun .. 
         return {
            fetchAlbums:builder.query({
                providesTags:(result,error,user)=>{
                    debugger;
                    const tags = result.map((album)=>{
                        return { type:'Album',id:album.id}
                    }) // result nece dene element varsa hamsini donderir remove,add ve s  
                    tags.push({
                        type:'UsersAlbums',id:user.id
                    }); // refetching
                    return tags;
                },
                query:(user)=>{
                    return {
                        url:'/albums',
                        method: 'GET',
                        params: {
                            userID:user.id
                        }
                    }
                }
            }),
            addAlbum:builder.mutation({
                invalidatesTags:(result,error,user) => {
                    return[{type:'UsersAlbums',id:user.id}]
                },
                query:(user)=>{
                    return {
                        url:'/albums',
                        method: 'POST',
                        body:{
                            userID: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            removeAlbum:builder.mutation({
                invalidatesTags:(result,error,album)=>{
                    return [{type:'Album',id:album.id}]
                },
                query:(album)=>{
                    return {
                        url:`/albums/${album.id}`,
                        method: 'DELETE'
                    }
                }
            })
            // datani cekmek istedikde query bir seyi silmek elave etmek mutation
         }
    }
});

export const {useFetchAlbumsQuery,useAddAlbumMutation,useRemoveAlbumMutation} = albumsApi;
export {albumsApi};