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
  items: Item[]
}

export interface SetItemAction {
  type: typeof SET_ITEM
  item: Item
}

interface RemoveItemAction {
  type: typeof REMOVE_ITEM
  itemId: string
}

interface AddItemAction {
  type: typeof ADD_ITEM
  item: Item
}

interface UpdateItemAction {
  type: typeof UPDATE_ITEM
  item: Item
}

type ItemActionTypes =
  | SetItemsAction
  | SetItemAction
  | RemoveItemAction
  | AddItemAction
  | UpdateItemAction

// State Type
interface ItemState {
  items: Item[]
  selectedItem: Item
}

// Initial State
const initialState: ItemState = {
  items: [],
  selectedItem: {} as Item,
}

// Reducer
export function itemReducer(state = initialState, action: ItemActionTypes): ItemState {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, items: [...action.items] }

    case SET_ITEM:
      const updatedItemsSet = state.items.map((item) =>
        item._id !== action.item._id ? item : action.item
      )
      return { ...state, items: [...updatedItemsSet], selectedItem: action.item }

    case ADD_ITEM:
      return { ...state, items: [...state.items, action.item] }

    case REMOVE_ITEM:
      const updateItemsRemove = state.items.filter((item) => item._id !== action.itemId)
      return { ...state, items: [...updateItemsRemove] }

    case UPDATE_ITEM:
      const updatedItemsUpdate = state.items.map((item) =>
        item._id === action.item._id ? action.item : item
      )
      return { ...state, items: [...updatedItemsUpdate], selectedItem: action.item }

    default:
      return state
  }
}

