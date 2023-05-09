import React from 'react'
import { useAddUserMutation, useFetchUsersQuery } from '../store'
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'
import UsersListItem from './UsersListItem';
import CircularProgress from '@mui/material/CircularProgress'

function UsersList() {
  const {data, isError, isFetching} = useFetchUsersQuery();

  const [addUser,results] = useAddUserMutation();

  const handleUserAdd = () => {
        addAlbum();
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
    content = data.map((user)=>{
      return <UsersListItem key={user.id} user={user}/>
    })
  }


  return (
   <>
    <div className='topArrangement'>
      <h1>User</h1>
      <Button variant='outlined' onClick={handleUserAdd}>
        {results.isLoading ? (<CircularProgress/>) : <span>Add User</span> }
      </Button>
    </div>
    <div>{content}</div>
   </>
  )
}

export default UsersList