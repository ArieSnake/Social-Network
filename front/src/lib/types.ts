export interface IUser {
    id:string
    name:string
    surname:string
    login:string
    password:string
    isPrivate:boolean
    cover:string
    picture:string
}

export type InputUser = Omit<IUser, 'id'| 'isPrivate'|'cover'| 'picture'>

export type LoginUser = Pick<IUser, 'login'| 'password'>

export interface iResponse{
    status:string
    message?:string
    paylod?:unknown
}