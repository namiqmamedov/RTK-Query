import React from 'react'
import {GoTrashcan} from 'react-icons/go'
import CircularProgress from '@mui/material/CircularProgress'
import { useRemovePhotoMutation } from '../store';


function PhotoListItem({photo}) {
    const [removePhoto,
        results] = useRemovePhotoMutation();

    return (
        <div onClick={() => (removePhoto(photo))}>
            <img src={photo.URL} alt="Photo"/> {results.isLoading
                ? (<CircularProgress
                    style={{
                    width: '20px',
                    height: '20px'
                }}/>)
                : (<GoTrashcan  className='removePhoto'/>)
}
        </div>
    )
}

export default PhotoListItem