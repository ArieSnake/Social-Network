import React from "react";
import { IPost } from "../lib/types";
import { BASE_URL } from "../lib/constant";

interface IProps {
    posts: IPost[];
}

export const Gallery: React.FC<IProps> = ({ posts }) => {
    return (
        <div className="gallery">
            {/* <p>You have {posts.length} posts</p> */}
            <div className="gallery-list">
                {posts.map(post => (
                    <div key={post.id} className="gallery-post">
                        <img
                            src={BASE_URL + post.picture}
                            alt={post.title}
                            className="gallery-post-image"
                        />
                        <p>{post.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
