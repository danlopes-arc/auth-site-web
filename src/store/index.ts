import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { sytemReducer } from './system/reducer'
import { SystemAction } from './system/types'

const token = localStorage.getItem('token')

const initialState: AppState = {
  system: {
    token: token,
    loggedIn: !!token,
    user: null,
  },
}

const rootReducer = combineReducers({
  system: sytemReducer,
})

const w: any = window
const devTools =
  (w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__()) ||
  ((next: any) => next)

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk), devTools)
)

export default store

export type AppState = ReturnType<typeof rootReducer>
export type AppAction = SystemAction
export type AppAsyncAction = ThunkAction<
  Promise<void>,
  AppState,
  any,
  AppAction
>
export type AppDispatch = ThunkDispatch<AppState, any, AppAction>

store.subscribe(() => {
  const state = store.getState()
  if (state.system.token !== localStorage.getItem('token') || undefined) {
    if (!state.system.token) {
      return localStorage.removeItem('token')
    }
    return localStorage.setItem('token', state.system.token)
  }
})
