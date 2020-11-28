import { UserInfo } from '../../types'

export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const SET_TOKEN = 'SET_TOKEN'

type SetUserAction = {
  type: typeof SET_USER
  user: UserInfo
}

type LogoutAction = {
  type: typeof LOGOUT
}

type SetTokenAction = {
  type: typeof SET_TOKEN
  token: string
}

export type SystemState = {
  loggedIn: boolean
  user: UserInfo | null
  token: string | null
}

export type SystemAction = SetUserAction | LogoutAction | SetTokenAction
