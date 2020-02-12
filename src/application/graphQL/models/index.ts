
export interface IModelUser {
  id : number
  accountCode ?: string
  description ?: string
}

export interface IModelAccount {
  id : number
  userName ?: string
  email ?: string
  status ?: string
  user ?: IModelUser
}
