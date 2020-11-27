export interface IUserInfo {
  id: any
  name: string
  email: string
}

export interface IUserRegisterData {
  name?: string
  email?: string
  password?: string
}

export interface IUserLoginData {
  email?: string
  password?: string
}

export interface IFormError {
  message: string
  fields: IFieldErrors
}

export interface IFieldErrors {
  [key: string]: string[]
}
