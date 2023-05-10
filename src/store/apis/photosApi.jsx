import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {faker} from '@faker-js/faker'


const pause = (duration) => {
    return new Promise((resolve) =>{
        setTimeout(resolve,duration)
    })
}

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:5174',
        fetchFn: async(...args)=>{
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder){ // datalari cekmek , silmek ucun .. 
         return {
            fetchPhotos:builder.query({
                providesTags:(result,error,album)=>{
                    const tags = result.map((photo)=>{
                        return { type:'Photo',id:photo.id}
                    }) // result nece dene element varsa hamsini donderir remove,add ve s  
                    tags.push({
                        type:'AlbumPhoto',id:album.id
                    }); // refetching
                    return tags;
                },
                query:(album)=>{
                    return {
                        url:'/photos',
                        method: 'GET',
                        params: {
                            albumID:album.id
                        }
                    }
                }
            }),
            addPhoto:builder.mutation({
                invalidatesTags:(result,error,album) => {
                    return[{type:'AlbumPhoto',id:album.id}]
                },
                query:(album)=>{
                    return {
                        url:'/photos',
                        method: 'POST',
                        body:{
                            albumID: album.id,
                            URL: faker.image.abstract(150,150,true),

                        }
                    }
                }
            }),
            removePhoto:builder.mutation({
                invalidatesTags:(result,error,photo)=>{
                    return [{type:'Photo',id:photo.id}]
                },
                query:(photo)=>{
                    return {
                        url:`/photos/${photo.id}`,
                        method: 'DELETE'
                    }
                }
            })
            // datani cekmek istedikde query bir seyi silmek elave etmek mutation
         }
    }
});

export const {useFetchPhotosQuery,useAddPhotoMutation,useRemovePhotoMutation} = photosApi;
export {photosApi};         