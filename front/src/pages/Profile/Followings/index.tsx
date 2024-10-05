import React, { useEffect, useState } from 'react'
import { handleGetFollowing } from '../../../lib/api'
import { IUser } from '../../../lib/types'
import { DEFAULT_PIC } from '../../../lib/constant'


export const Following: React.FC = () => {
  const [following, setFollowing] = useState<IUser[]>([])

  useEffect(() => {
    handleGetFollowing().then(response => {
      if (response.status === 'ok' && response.payload) {
        setFollowing(response.payload as IUser[])
      }
    })
  }, [])

  return (
    <div className="following-list">
      <h2>Users You're Following</h2>
      {following.map(user => (
        <div key={user.id} className="user-item">
          <img src={user.picture || DEFAULT_PIC} />
          <p>{user.name} {user.surname}</p>
        </div>
      ))}
    </div>
  )
}