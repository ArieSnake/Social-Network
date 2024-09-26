import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { handleLogout, handleVerify } from "../../lib/api"
import { IWideUser } from "../../lib/types"
import CustomNavLink from "../../components/navlink"

export const Profile = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState<IWideUser | null>(null)
    useEffect(() => {
        handleVerify()
        .then(response => {
            if(!response.user){
                navigate('/login')
            }else{
                setAccount(response.user)
            }
        })
    }, [])
    
    const logout = () => {
        handleLogout()
        .then(response => {
            if(response.status === 'ok'){
                navigate('/login')
            }else {
                console.error('Logout failed', response.message)
            }
        })
        .catch(error => {
            console.error('Logout request failed', error);
            
        })
    }




    return account && <>
        <nav>
            <CustomNavLink to='/profile' end>Profile</CustomNavLink>
            <CustomNavLink to='/profile/settings'>Settings</CustomNavLink>
            <CustomNavLink to='/profile/search'>Search</CustomNavLink>
            <CustomNavLink to='/profile/posts'>Posts</CustomNavLink>
            <CustomNavLink to='/profile/followers'>Followers</CustomNavLink>
            <CustomNavLink to='/profile/followings'>Followings</CustomNavLink>
            <button onClick={logout}>Logout</button>
        </nav>

        <Outlet
            context={{account,setAccount}}
        
        />
    </>
}

/*  */