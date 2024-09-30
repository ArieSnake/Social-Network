import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { handleGetUserById } from '../../../lib/api'
import { IUser } from '../../../lib/types'
import { BASE_URL, DEFAULT_PIC, DEFAULT_COVER_PIC } from '../../../lib/constant'
import { Gallery } from '../../../components/Gallery'
import { useOutletContext } from 'react-router-dom'

export const UserProfile = () => {
    const { id } = useParams<{ id: string }>() 
    const [user, setUser] = useState<IUser | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    const { account } = useOutletContext<{ account: IUser }>()

    useEffect(() => {
        if (id) {
            handleGetUserById(id)
                .then(response => {
                    if (response.status === 'ok' && response.payload) {
                        setUser(response.payload as IUser)
                    } else {
                        setError('User not found')
                    }
                })
                .catch(() => setError('Failed to load user details'))
        }
    }, [id])

    if (error) {
        return <p>{error}</p>
    }

    if (!user) {
        return <p>Loading...</p>
    }

    const isMyProfile = account && account.id === user.id

    return (
        <div>
            <div style={{ position: 'relative', marginBottom: '30px' }}>
                <img
                    src={user.cover ? BASE_URL + user.cover : DEFAULT_COVER_PIC}
                    alt="Cover"
                    style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover'
                    }}
                />
                <img
                    src={user.picture ? BASE_URL + user.picture : DEFAULT_PIC}
                    alt="User"
                    style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        position: 'absolute',
                        bottom: '-75px', 
                        left: '20px',
                        border: '5px solid white',
                        objectFit: 'cover'
                    }}
                />
            </div>

            <h2 style={{ marginTop: '80px' }}>{user.name} {user.surname}</h2>
            <p>{user.isPrivate ? 'Private Account' : 'Public Account'}</p>


            <p>
                {isMyProfile ? 
                    `You have ${user.posts?.length || 0} posts` : 
                    `${user.name} has ${user.posts?.length || 0} posts`}
            </p>


            {!user.isPrivate && (
                <>
                    <h3>Posts</h3>
                    <Gallery posts={user.posts || []} />
                </>
            )}
        </div>
    )
}
