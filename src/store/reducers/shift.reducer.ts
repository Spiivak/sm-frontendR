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
  shifts: Shift[]
}

export interface SetShiftAction {
  type: typeof SET_SHIFT
  shift: Shift
}

interface RemoveShiftAction {
  type: typeof REMOVE_SHIFT
  shiftId: string
}

interface AddShiftAction {
  type: typeof ADD_SHIFT
  shift: Shift
}

interface UpdateShiftAction {
  type: typeof UPDATE_SHIFT
  shift: Shift
}

type ShiftActionTypes =
  | SetShiftsAction
  | SetShiftAction
  | RemoveShiftAction
  | AddShiftAction
  | UpdateShiftAction

// State Type
interface ShiftState {
  shifts: Shift[]
  selectedShift: Shift
}

// Initial State
const initialState: ShiftState = {
  shifts: [],
  selectedShift: {} as Shift,
}

// Reducer
export function shiftReducer(state = initialState, action: ShiftActionTypes): ShiftState {
  switch (action.type) {
    case SET_SHIFTS:
      return { ...state, shifts: [...action.shifts] }

    case SET_SHIFT:
      const updatedShiftsSet = state.shifts.map((shift) =>
        shift._id !== action.shift._id ? shift : action.shift
      )
      return { ...state, shifts: [...updatedShiftsSet], selectedShift: action.shift }

    case ADD_SHIFT:
      return { ...state, shifts: [...state.shifts, action.shift] }

    case REMOVE_SHIFT:
      const updateShiftsRemove = state.shifts.filter((shift) => shift._id !== action.shiftId)
      return { ...state, shifts: [...updateShiftsRemove] }

    case UPDATE_SHIFT:
      const updatedShiftsUpdate = state.shifts.map((shift) =>
        shift._id === action.shift._id ? action.shift : shift
      )
      return { ...state, shifts: [...updatedShiftsUpdate], selectedShift: action.shift }

    default:
      return state
  }
}

