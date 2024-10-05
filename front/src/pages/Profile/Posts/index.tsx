import { useEffect, useRef, useState } from "react"
import { handleGetPosts, handlePostCreation, handleDeletePost } from "../../../lib/api"
import { IPost } from "../../../lib/types"
import { Gallery } from "../../../components/Gallery"

export const Posts = () => {
    const handleUpload = () => {
        if (photo.current) {
            const file = photo.current.files?.[0]
            if (file) {
                const form = new FormData()
                form.append("photo", file)
                form.append("content", text)

                handlePostCreation(form).then((response) => {
                    setList([...list, response.payload as IPost])
                })
            }
        }
    }

    const handleDelete = (postId: number) => {
        handleDeletePost(postId).then((response) => {
            if (response.status === "ok") {
                setList((prevList) => prevList.filter((post) => post.id !== postId))
            }
        })
    }

    const [list, setList] = useState<IPost[]>([])
    const [text, setText] = useState<string>("")
    const photo = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        handleGetPosts().then((response) => {
            setList(response.payload as IPost[])
        })
    }, [])

    return (
        <div className="posts-container">
            <h3 className="posts-header">Posts</h3>

            <div className="posts-input-section">
                <input
                    type="file"
                    style={{ display: "none" }}
                    ref={photo}
                    onChange={handleUpload}
                />

                <input
                    type="text"
                    className="form-control posts-text-input"
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: "600px" }}
                />
                <button
                    onClick={() => photo.current?.click()}
                    className="btn btn-info posts-upload-button my-2"
                >
                    Upload
                </button>
            </div>

            <Gallery posts={list} onDeletePost={handleDelete}/>
        </div>
    )
}
