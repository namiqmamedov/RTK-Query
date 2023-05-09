import React from 'react'

function UsersListItem({user}) {
    return (
        <div>
            <h1>{user.name}</h1>
        </div>
    )
}

export default UsersListItem