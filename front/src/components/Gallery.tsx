import React from "react";
import { IPost } from "../lib/types";
import { BASE_URL } from "../lib/constant";

interface IProps {
    posts: IPost[];
}

export const Gallery: React.FC<IProps> = ({ posts }) => {
    return (
        <div className="gallery">
            <div className="gallery-list">
                {posts.map(post => (
                    <div key={post.id} className="gallery-post">
                        <img
                            src={post.picture ? BASE_URL + post.picture : '/path/to/default-image.jpg'}
                            alt={post.title}
                            className="gallery-post-image"
                            loading="lazy"
                        />
                        <div className="gallery-post-details">
                            <p>{post.title}</p>
                            <small>{post.likes ? post.likes.length : 0} likes</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
