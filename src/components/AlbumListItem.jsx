import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import PhotoList from './PhotoList'
import {GoTrashcan} from 'react-icons/go'
import { useRemoveAlbumMutation, useRemoveUserMutation } from '../store'
import CircularProgress from '@mui/material/CircularProgress'

function AlbumListItem({album}) {

  const [removeAlbum,results] = useRemoveAlbumMutation();

   const header = (
        <>
        <button style={{marginRight: '30px', border: 'none'}} onClick={() => (removeAlbum(album))}>
            {results.isLoading ? (<CircularProgress 
            style={{width: '20px', height: '20px'}} />)
            : ( <GoTrashcan/>) }
        </button>
        {album.title}
    </>
   )

  return (
    <div>
              <ExpandablePanel header={header}>
            {/* <h1>{user.name}</h1> */}
            <PhotoList album={album} />
            </ExpandablePanel>
        </div>
  )
}

export default AlbumListItem