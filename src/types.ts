export type UserInfo = {
  id: any
  name: string
  email: string
}

export type UserRegisterData = {
  name: string
  email: string
  password: string
}

export type UserLoginData = {
  email: string
  password: string
}

export type FormError<Data> = {
  message: string
  fields: FieldErrors<Data>
}

export type FieldErrors<Data> = {
  [key in keyof Data & string]?: string[]
}

export type DataConstraints<Data> = {
  [key in keyof Data & string]: any
}

export type MeResponseData = {
  user: UserInfo
}

export type LoginResponseData = {
  token: string
}

export class ErrorWithData<Data = any> extends Error {
  readonly data: Data
  constructor(data: Data, message?: string) {
    super(message)
    this.data = data
  }
}
