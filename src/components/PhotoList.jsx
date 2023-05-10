import React from 'react'
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store';
import PhotoListItem from './PhotoListItem';
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

function PhotoList({album}) {
  const {data, isError, isFetching} = useFetchPhotosQuery(album);
  const [addPhoto,results] = useAddPhotoMutation();

  const handlePhotoAdd = () => {
    addPhoto(album);
}

let content;

if(isFetching){
  content=(
    <Skeleton variant='rectangular' sx={{width: '100%', height: '400px'}}/>
  )
}
else if(isError){
    content = <div></div>
}
else{
  content = data.map((photo)=>{
    return <PhotoListItem key={photo.id} photo={photo}/>
  })
}
  return (
    <div>
      <div className='topArrangement'>
    <h3>{album.title} Photos</h3>
    <Button variant='outlined' onClick={handlePhotoAdd}>
      {results.isLoading ? (<CircularProgress/>) : <span>Add </span> }
    </Button>
  </div>
  <div className='photoDiv'>
  {content}
  </div>
  </div>
  )
}

export default PhotoList