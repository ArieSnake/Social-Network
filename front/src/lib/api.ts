import axios from "axios"
import { InputUser, IResponse, LoginUser } from "./types"

const Axios = axios.create({
    baseURL:'http://localhost:4002',
    withCredentials:true
})

export const handleSignup = async(user:InputUser):Promise<IResponse> => {
    const response = await Axios.post('/signup', user)
    return response.data
}

export const handleLogin = async (credentials: LoginUser): Promise<IResponse> => {
    const response = await Axios.post('/login', credentials)
    return response.data
}

export const handleVerify = async():Promise<IResponse> => {
    const response = await Axios.get('/verify')
    return response.data
}

export const handleLogout = async():Promise<IResponse> => {
    const response = await Axios.post('/logout')
    return response.data
}

export const handlePasswordUpdate = async(oldPassword:string, newPassword:string):Promise<IResponse> => {
    const response = await Axios.patch('/update/password', {
        old: oldPassword,
        newpwd: newPassword
    })
    return response.data
}

export const handleLoginUpdate = async (password: string, login: string): Promise<IResponse> => {
    const response = await Axios.patch('/update/login', {
        password,
        login
    })
    return response.data
}

export const handlePictureUpload = async (data: FormData):Promise<IResponse> => {
    const response = await Axios.patch('/profile/upload', data)
    return response.data
}

export const handleCoverPictureUpload = async(data: FormData):Promise<IResponse> => {
    const response = await Axios.patch('/cover/upload', data)
    return response.data
}

export const handleGetPosts = async():Promise<IResponse> => {
    const response = await Axios.get('/posts')
    return response.data
}

export const handlePostCreation = async(data:FormData):Promise<IResponse> => {
    const response = await Axios.post('/posts', data)
    return response.data
}

export const handleSearch = async(text:string): Promise<IResponse> => {
    const response = await Axios.get('/search/' + text)
    return response.data
}

export const handleGetUserProfile = async (userId: string): Promise<IResponse> => {
    const response = await Axios.get(`/users/${userId}`)
    return response.data
}

export const handleGetUserById = async (id: string): Promise<IResponse> => {
    const response = await Axios.get(`/account/${id}`)
    return response.data
}


export const handlePrivacyUpdate = async (): Promise<IResponse> => {
    const response = await Axios.patch('/account/set')
    return response.data
}


  


export const handleSendFollow = async(id:number | string):Promise<IResponse> => {
   
    const response = await Axios.post('/account/follow/' + id)
    console.log("API Response:", response);
    return response.data
  }

export const handleUnfollow = async(id:number | string):Promise<IResponse> => {
    const response = await Axios.post('/account/unfollow/' + id)
    return response.data
}

export const handleCancelRequest = async (id:number | string):Promise<IResponse> => {
    const response = await Axios.delete('/request/cancel/' + id)
    return response.data
}

export const handleGetRequests = async():Promise<IResponse> => {
    const response  = await Axios.get('/requests')
    return response.data
}

export const handleAcceptRequest = async(id:number | string):Promise<IResponse> => {
    const response = await Axios.patch('/requests/accept/' + id)
    return response.data
}

export const handleDeclineRequest = async(id: number | string):Promise<IResponse> => {
    const response = await Axios.patch('/requests/decline/' + id)
    return response.data
}

export const handlePostReaction = async(id:number):Promise<IResponse> => {
    const response = await Axios.post('/posts/react/' + id)
    return response.data
}

export const handleBlockUser = async (id: number | string): Promise<IResponse> => {
    const response = await Axios.post(`/block/${id}`);
    return response.data;
};

export const handleUnblockUser = async (id: number | string): Promise<IResponse> => {
    const response = await Axios.post(`/block/${id}`);
    return response.data;
}

export const handleDeletePost = async (postId: number | string): Promise<IResponse> => {
    const response = await Axios.delete(`/posts/${postId}`);
    return response.data;
  };

  export const handleGetPostById = async(postId: number | string): Promise<IResponse> => {
    const response = await Axios.get(`/posts/${postId}`)
    return response.data
}

export const handleGetFollowing = async (): Promise<IResponse> => {
    const response = await Axios.get('/following');
    return response.data;
  };

  export const handleGetFollowers = async (): Promise<IResponse> => {
    const response = await Axios.get('/followers');
    return response.data;
  };