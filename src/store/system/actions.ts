import axios, { AxiosRequestConfig } from 'axios'
import { AppAsyncAction } from '..'
import {
  ErrorWithData,
  FormError,
  LoginResponseData,
  MeResponseData,
  UserInfo,
  UserLoginData,
  UserRegisterData,
} from '../../types'
import { LOGOUT, SET_TOKEN, SET_USER, SystemAction } from './types'

export const setUser = (user: UserInfo): SystemAction => {
  return {
    type: SET_USER,
    user,
  }
}

export const logout = (): SystemAction => {
  return {
    type: LOGOUT,
  }
}

export const login = (userData: UserLoginData): AppAsyncAction => async (
  dispatch
) => {
  try {
    const res = await axios.post<LoginResponseData>('api/users/login', userData)
    dispatch({
      type: SET_TOKEN,
      token: res.data.token,
    })
  } catch (err) {
    if (err.response?.data) {
      const formError = err.response.data as FormError<UserLoginData>
      throw new ErrorWithData(formError.fields)
    }
    throw new Error('Something went wrong')
  }
}

export const githubLogin = (code: string): AppAsyncAction => async (dispatch) => {
  try {
    const res = await axios.get(`/api/auth/github/login?code=${code}`)

    dispatch({
      type: SET_TOKEN,
      token: res.data.token,
    })
  } catch (err) {
    throw new Error('Something went wrong')
  }
}

export const registerUser = (
  userData: UserRegisterData
): AppAsyncAction => async () => {
  try {
    await axios.post('api/users/register', userData)
  } catch (err) {
    if (err.response?.data) {
      const formError = err.response.data as FormError<UserRegisterData>
      throw new ErrorWithData(formError.fields)
    }
    throw new Error('Something went wrong')
  }
}

export const getUserInfo = (): AppAsyncAction => async (dispatch, getState) => {
  const state = getState()
  if (!state.system.loggedIn) return
  if (!state.system.token) {
    dispatch({
      type: LOGOUT,
    })
    return
  }

  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${state.system.token}`,
      },
    }
    const res = await axios.get<MeResponseData>('api/users/me', config)
    dispatch({
      type: SET_USER,
      user: res.data.user
    })
  } catch (err) {
    if (err.response?.status === 401) {
      dispatch({
        type: LOGOUT
      })
    }
    // throw new Error('Something went wrong')
  }
}
