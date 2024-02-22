import { User, userService } from "../../services/user.service"

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'


interface SetUserAction {
  type: typeof SET_USER
  user: User | null
}

interface SetWatchUserAction {
  type: typeof SET_WATCHED_USER
  user: User | null
}

interface RemoveUserAction {
  type: typeof REMOVE_USER
  userId: string
}

interface SetUsersAction {
  type: typeof SET_USERS
  users: User[]
}


type UserActionTypes = SetUserAction | SetWatchUserAction | RemoveUserAction | SetUsersAction

interface UserState {
  count: number
  user: User | null
  users: User[]
  watchedUser: User | null
}

const initialState: UserState = {
  count: 10,
  user: userService.getLoggedinUser(),
  users: [],
  watchedUser: null
}

export function userReducer(state = initialState, action: UserActionTypes): UserState {
  var newState = state
  switch (action.type) {
    case SET_USER:
      newState = { ...state, user: action.user }
      break
    case SET_WATCHED_USER:
      newState = { ...state, watchedUser: action.user }
      break
    case REMOVE_USER:
      newState = {
        ...state,
        users: state.users.filter(user => user.id !== action.userId)
      }
      break
    case SET_USERS:
      newState = { ...state, users: action.users }
      break
    default:
  }
  // For debug:
  // window.userState = newState
  // console.log('State:', newState)
  return newState

}
