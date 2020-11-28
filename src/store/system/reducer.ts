import { SystemAction, SystemState, SET_USER, LOGOUT, SET_TOKEN } from './types'

const initalState: SystemState = {
  loggedIn: false,
  user: undefined,
}

export const sytemReducer = (
  state: SystemState = initalState,
  action: SystemAction
): SystemState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: undefined,
        token: undefined,
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
        loggedIn: true,
      }
    default:
      return state
  }
}
