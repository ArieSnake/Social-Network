import React, { useEffect, useState } from 'react'
import { handleGetRequests, handleAcceptRequest, handleDeclineRequest } from '../../../lib/api'
import { IUser } from '../../../lib/types'
import { BASE_URL, DEFAULT_PIC } from '../../../lib/constant'

interface IRequest {
    id: number
    user: IUser
}

export const Requests = () => {
    const [requests, setRequests] = useState<IRequest[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadRequests()
    }, [])

    const loadRequests = () => {
        setLoading(true)
        handleGetRequests()
            .then(response => {
                console.log("API Response:", response) 
                if (response.status === 'ok' && response.payload) {
                    setRequests(response.payload as IRequest[])
                } else {
                    setError('Failed to load requests.')
                }
            })
            .catch(() => setError('Failed to load requests.'))
            .finally(() => setLoading(false))
    }

    const acceptRequest = (id: number) => {
        handleAcceptRequest(id)
            .then(response => {
                if (response.status === 'ok') {
                    setRequests(requests.filter(request => request.id !== id))
                }
            })
            .catch(() => alert('Failed to accept request.'))
    }

    const declineRequest = (id: number) => {
        handleDeclineRequest(id)
            .then(response => {
                if (response.status === 'ok') {
                    setRequests(requests.filter(request => request.id !== id))
                }
            })
            .catch(() => alert('Failed to decline request.'))
    }

    if (loading) return <p>Loading requests...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h3>Follow Requests</h3>
            {requests.length === 0 ? (
                <p>No pending requests.</p>
            ) : (
                <ul>
                    {requests.map(request => (
                        <li key={request.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                            <img
                                src={request.user.picture ? BASE_URL + request.user.picture : DEFAULT_PIC}
                                alt="Profile"
                                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                            />
                            <div style={{ flexGrow: 1 }}>
                                <p>
                                    {request.user.name} {request.user.surname} sent you a follow request.
                                </p>
                            </div>
                            <button onClick={() => acceptRequest(request.id)} className="btn btn-success me-2">Accept</button>
                            <button onClick={() => declineRequest(request.id)} className="btn btn-danger">Decline</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
