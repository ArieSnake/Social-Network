import React, { useState } from "react"
import { IPost } from "../lib/types"
import { BASE_URL } from "../lib/constant"
import { handlePostReaction } from "../lib/api"
import { Post } from "./Post"

interface IProps {
    posts: IPost[]
    onUpdatePost?: (id: number) => void
    onDeletePost?: (id: number) => void
}

export const Gallery: React.FC<IProps> = ({ posts, onUpdatePost, onDeletePost }) => {
    const [currentPost, setCurrentPost] = useState<number>(-1)

    const reactPost = (id: number) => {
        handlePostReaction(id).then(() => {
            if (onUpdatePost) {
                onUpdatePost(id)
            }
        })
    }

    return (
        <>
            <div className="gallery">
                <div className="gallery-list">
                    {posts.map((post) => (
                        <div key={post.id} className="gallery-post post">
                            <img
                                src={post.picture ? BASE_URL + post.picture : '/path/to/default-image.jpg'}
                                alt={post.title}
                                className="gallery-post-image post-img"
                                loading="lazy"
                            />
                            <div onClick={() => setCurrentPost(post.id)} className="cover"></div>
                            <img
                                onClick={() => reactPost(post.id)}
                                className={`like-btn ${post.isLiked ? 'liked' : 'unliked'}`}
                                src={
                                    post.isLiked
                                        ? "https://cdn4.iconfinder.com/data/icons/set-1/32/__1-256.png"
                                        : 'https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_white.png'
                                }
                            />

                            {/* Only show delete button if onDeletePost is provided */}
                            {onDeletePost && (
                                <button className="delete-btn" onClick={() => onDeletePost(post.id)}>
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {currentPost !== -1 && <Post handleClose={() => setCurrentPost(-1)} postId={currentPost} />}
        </>
    )
}
