import axios from "axios";
import { InputUser, IResponse, LoginUser } from "./types";

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
    return response.data;
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