import { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit'
import { useNavigate, useParams } from 'react-router-dom'
import { Gallery } from '../../../components/Gallery'
import { IAccount, IPost } from '../../../lib/types'
import { handleBlockUser, handleCancelRequest, handleDeletePost, handleGetUserById, handleSendFollow, handleUnfollow } from '../../../lib/api'
import { BASE_URL, DEFAULT_COVER_PIC, DEFAULT_PIC } from '../../../lib/constant'

export function Account() {
    const { id } = useParams()
    const [found, setFound] = useState<IAccount | null>(null)
    const navigate = useNavigate()

    const handleRequest = () => {
        if (found) {
            if (found.connection.following) {
                unfollowUser()
            } else if (found.isPrivate && found.connection.requested) {
                cancelRequest()
            } else {
                followUser()
            }
        }
    }

    const blockUser = () => {
        if (found && found.id) {
            handleBlockUser(found.id).then(responce => {
                if (responce.message == "blocked") {
                    setFound({
                        ...found,
                        available: false,
                        connection: { ...found.connection, didIBlock: true }
                    })
                } else if (responce.message == "unblocked") {
                    setFound({
                        ...found,
                        available: true,
                        connection: { ...found.connection, didIBlock: false }
                    })
                }
            })
        }
    }

    const followUser = () => {
        if (found && found.id) {
            handleSendFollow(found.id).then(response => {
                if (response.status === "following") {
                    setFound({
                        ...found,
                        connection: { ...found.connection, following: true }
                    })
                } else if (response.status === "requested") {
                    setFound({
                        ...found,
                        connection: { ...found.connection, requested: true }
                    })
                }
            })
        }
    }

    const unfollowUser = () => {
        if (found && found.id) {
            handleUnfollow(found.id).then(response => {
                if (response.status === "unfollowed") {
                    setFound({
                        ...found,
                        connection: { ...found.connection, following: false }
                    })
                } else if (response.status === "requested") {
                    setFound({
                        ...found,
                        connection: { ...found.connection, requested: true }
                    })
                }
            })
        }
    }

    const cancelRequest = () => {
        if (found && found.id) {
            handleCancelRequest(found.id).then(response => {
                if (response.status === "cancelled") {
                    setFound({
                        ...found,
                        connection: {
                            ...found.connection,
                            requested: false
                        }
                    })
                }
            })
        }
    }

    const changePostStatus = (id: number) => {
        if (found) {
            const temp = { ...found }
            const post = temp.posts?.find(p => p.id == id)
            if (post) {
                post.isLiked = !post.isLiked
                setFound(temp)
            }
        }
    }

    // Add handleDeletePost function to delete posts
    const handleDelete = (postId: number) => {
        handleDeletePost(postId).then(response => {
            if (response.status === 'ok') {
                setFound(prevFound => {
                    if (!prevFound) return null
                    const updatedPosts = prevFound.posts?.filter(post => post.id !== postId)
                    return { ...prevFound, posts: updatedPosts || [] }
                })
            }
        })
    }

    useEffect(() => {
        if (id) {
            handleGetUserById(id).then(response => {
                if (!response.payload) {
                    navigate('/profile')
                } else {
                    setFound(response.payload as IAccount)
                }
            })
        }
    }, [id])

    return (
        found && (
            <div className="account-container">
                <MDBContainer className="container py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol md="12" xl="8">
                            <MDBCard className="account-card">
                                <MDBCardImage
                                    src={found.cover ? BASE_URL + found.cover : DEFAULT_COVER_PIC}
                                    className="account-cover"
                                    alt="Cover"
                                />
                                <MDBCardBody className="text-center">
                                    <div className="profile-pic-container">
                                        <MDBCardImage
                                            src={found.connection.didIBlock || found.connection.blockedme ? DEFAULT_PIC : (found.picture ? BASE_URL + found.picture : DEFAULT_PIC)}
                                            className="rounded-circle profile-pic"
                                            fluid
                                        />
                                        {found.connection.blockedme && (
                                            <p className="blocked-message">You are blocked</p>
                                        )}
                                        {found.connection.didIBlock && !found.connection.blockedme && (
                                            <p className="blocked-message">THIS USER IS NOT AVAILABLE</p>
                                        )}
                                    </div>
                                    <MDBTypography tag="h4">
                                        {found.name} {found.surname}
                                    </MDBTypography>
                                    <br />
                                    {found.isPrivate ? <div className="private-profile">PRIVATE PROFILE</div> : <small>public</small>}
                                    <br />
                                    {found.posts && !found.connection.didIBlock && !found.connection.blockedme && (
                                        <Gallery
                                            posts={found.posts}
                                            onDeletePost={handleDelete}
                                            onUpdatePost={changePostStatus}
                                        />
                                    )}

                                    {!found.connection.blockedme && (
                                        <button onClick={handleRequest} className="btn btn-info">
                                            {found.connection.following
                                                ? 'unfollow'
                                                : found.connection.followsMe
                                                    ? 'follow BACK'
                                                    : found.connection.requested
                                                        ? 'cancel request'
                                                        : 'follow'}
                                        </button>
                                    )}
                                    <br />

                                    <button className="block" onClick={blockUser}>
                                        {found.connection.didIBlock ? "unblock" : "block"}
                                    </button>

                                    <div className="info-section mt-5 mb-2">
                                        <div>
                                            <MDBCardText className="mb-1 h5">{found.followers?.length}</MDBCardText>
                                            <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                                        </div>
                                        <div>
                                            <MDBCardText className="mb-1 h5">{found.following?.length}</MDBCardText>
                                            <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    )
}
