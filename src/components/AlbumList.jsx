import React from 'react'
import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store';
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import AlbumListItem from './AlbumListItem';

function AlbumList({user}) {
  const {data, isError, isFetching} = useFetchAlbumsQuery(user);
  const [addAlbum,results] = useAddAlbumMutation();

  const handleAlbumAdd = () => {
    addAlbum(user);
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
  content = data.map((album)=>{
    return <AlbumListItem key={album.id} album={album}/>
  })
}

  return (
    <div><div className='topArrangement'>
    <h3>{user.name}</h3>
    <Button variant='outlined' onClick={handleAlbumAdd}>
      {results.isLoading ? (<CircularProgress/>) : <span>Add Album</span> }
    </Button>
  </div>{content}</div>
  )
}

export default AlbumList