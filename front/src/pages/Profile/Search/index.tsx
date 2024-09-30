import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleSearch } from "../../../lib/api"
import { Link } from "react-router-dom"
import { BASE_URL, DEFAULT_PIC, DEFAULT_PRIVATE_PIC } from "../../../lib/constant"

export const Search = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [text, setText] = useState<string>("")

    useEffect(() => {
        if (!text.trim()) {
            setUsers([])
        } else {
            handleSearch(text).then(response => {
                setUsers(response.payload as IUser[])
            })
        }
    }, [text])

    return (
        <div style={{ padding: 5 }}>
            <h3>Search</h3>
            <input
                type="text"
                placeholder="Let's find your friends"
                className="form-control"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            {users.length > 0 && <small>{users.length} users found!</small>}
            <div className="List">
                {users.map(user => (
                    <div key={user.id}>
                        <img
                            src={user.isPrivate ? DEFAULT_PRIVATE_PIC : (user.picture ? BASE_URL + user.picture : DEFAULT_PIC)}
                            alt="User"
                            style={{ width: "50px", borderRadius: "50%" }}
                        />
                        <p>{user.name} {user.surname}</p>
                        <Link to={`/profile/${user.id}`}>View Profile</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
