import { Item } from "../../services/item.service"

// Action Types
export const SET_ITEMS = 'SET_ITEMS'
export const SET_ITEM = 'SET_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const UPDATE_ITEM = 'UPDATE_ITEM'

// Action Interfaces
export interface SetItemsAction {
  type: typeof SET_ITEMS
  resources: Item[]
}

export interface SetItemAction {
  type: typeof SET_ITEM
  resource: Item
}

interface RemoveItemAction {
  type: typeof REMOVE_ITEM
  resourceId: string
}

interface AddItemAction {
  type: typeof ADD_ITEM
  resource: Item
}

interface UpdateItemAction {
  type: typeof UPDATE_ITEM
  resource: Item
}

type ItemActionTypes =
  | SetItemsAction
  | SetItemAction
  | RemoveItemAction
  | AddItemAction
  | UpdateItemAction

// State Type
interface ItemState {
  resources: Item[]
  selectedItem: Item
}

// Initial State
const initialState: ItemState = {
  resources: [],
  selectedItem: {} as Item,
}

// Reducer
export function resourceReducer(state = initialState, action: ItemActionTypes): ItemState {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, resources: [...action.resources] }

    case SET_ITEM:
      const updatedItemsSet = state.resources.map((resource) =>
        resource._id !== action.resource._id ? resource : action.resource
      )
      return { ...state, resources: [...updatedItemsSet], selectedItem: action.resource }

    case ADD_ITEM:
      return { ...state, resources: [...state.resources, action.resource] }

    case REMOVE_ITEM:
      const updateItemsRemove = state.resources.filter((resource) => resource._id !== action.resourceId)
      return { ...state, resources: [...updateItemsRemove] }

    case UPDATE_ITEM:
      const updatedItemsUpdate = state.resources.map((resource) =>
        resource._id === action.resource._id ? action.resource : resource
      )
      return { ...state, resources: [...updatedItemsUpdate], selectedItem: action.resource }

    default:
      return state
  }
}

