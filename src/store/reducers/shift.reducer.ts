import { Shift } from "../../services/shift.service"

// Action Types
export const SET_SHIFTS = 'SET_SHIFTS'
export const SET_SHIFT = 'SET_SHIFT'
export const REMOVE_SHIFT = 'REMOVE_SHIFT'
export const ADD_SHIFT = 'ADD_SHIFT'
export const UPDATE_SHIFT = 'UPDATE_SHIFT'

// Action Interfaces
export interface SetShiftsAction {
  type: typeof SET_SHIFTS
  resources: Shift[]
}

export interface SetShiftAction {
  type: typeof SET_SHIFT
  resource: Shift
}

interface RemoveShiftAction {
  type: typeof REMOVE_SHIFT
  resourceId: string
}

interface AddShiftAction {
  type: typeof ADD_SHIFT
  resource: Shift
}

interface UpdateShiftAction {
  type: typeof UPDATE_SHIFT
  resource: Shift
}

type ShiftActionTypes =
  | SetShiftsAction
  | SetShiftAction
  | RemoveShiftAction
  | AddShiftAction
  | UpdateShiftAction

// State Type
interface ShiftState {
  resources: Shift[]
  selectedShift: Shift
}

// Initial State
const initialState: ShiftState = {
  resources: [],
  selectedShift: {} as Shift,
}

// Reducer
export function resourceReducer(state = initialState, action: ShiftActionTypes): ShiftState {
  switch (action.type) {
    case SET_SHIFTS:
      return { ...state, resources: [...action.resources] }

    case SET_SHIFT:
      const updatedShiftsSet = state.resources.map((resource) =>
        resource._id !== action.resource._id ? resource : action.resource
      )
      return { ...state, resources: [...updatedShiftsSet], selectedShift: action.resource }

    case ADD_SHIFT:
      return { ...state, resources: [...state.resources, action.resource] }

    case REMOVE_SHIFT:
      const updateShiftsRemove = state.resources.filter((resource) => resource._id !== action.resourceId)
      return { ...state, resources: [...updateShiftsRemove] }

    case UPDATE_SHIFT:
      const updatedShiftsUpdate = state.resources.map((resource) =>
        resource._id === action.resource._id ? action.resource : resource
      )
      return { ...state, resources: [...updatedShiftsUpdate], selectedShift: action.resource }

    default:
      return state
  }
}

