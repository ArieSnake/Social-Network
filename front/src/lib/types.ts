export interface IUser {
    id:string
    name:string
    surname:string
    login:string
    password:string
    isPrivate:boolean
    cover:string
    picture:string
    posts?: IPost[]
}

export type InputUser = Omit<IUser, 'id'| 'isPrivate'|'cover'| 'picture'>

export type LoginUser = Pick<IUser, 'login'| 'password'>

export interface IResponse{
    status:string
    message?:string
    payload?:unknown
    user?:IWideUser
}

export interface IWideUser extends IUser{
    followers: IUser[]
    following: IUser[]
}
export interface IContextType{
    account:IWideUser
    setAccount:(user:IWideUser) => void
}

export interface IPasswordUpdateForm {
    oldPassword: string
    newPassword: string
}

export interface ILoginUpdateForm {
    password:string
    login: string
}

export interface IPost {
    id:number
    title:string
    picture:string
}

export interface IAccount extends IUser {
    isPrivate: boolean
    posts: IPost[]
}
