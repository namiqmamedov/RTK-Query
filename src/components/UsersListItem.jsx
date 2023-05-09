import React from 'react'
import AlbumList from './AlbumList'
import ExpandablePanel from './ExpandablePanel'
import {GoTrashcan} from 'react-icons/go'
import { useRemoveUserMutation } from '../store'
import CircularProgress from '@mui/material/CircularProgress'



function UsersListItem({user}) {

    const [removeUser,results] = useRemoveUserMutation();

    const header = (
    <>
        <button style={{marginRight: '30px', border: 'none'}} onClick={() => (removeUser(user))}>
            {results.isLoading ? (<CircularProgress 
            style={{width: '20px', height: '20px'}} />)
            :(<GoTrashcan/>)}
        </button>
        {user.name}
    </>
    )
    return (
        <div>
              <ExpandablePanel header={header}>
            {/* <h1>{user.name}</h1> */}
            <AlbumList user={user} />
            </ExpandablePanel>
        </div>
    )
}

export default UsersListItem