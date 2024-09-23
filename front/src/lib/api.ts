import axios from "axios";
import { InputUser, iResponse, LoginUser } from "./types";

const Axios = axios.create({
    baseURL:'http://localhost:4002'
})

export const handleSignup = async(user:InputUser):Promise<iResponse> => {
    const response = await Axios.post('/signup', user)
    return response.data
}

export const handleLogin = async (credentials: LoginUser): Promise<iResponse> => {
    const response = await Axios.post('/login', credentials)
    return response.data;
}