import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import { itemReducer } from './actions/item.action';

// import { selectedTaskReducer } from './reducers/selected-task.reducer'

const rootReducer = combineReducers({
  itemModule: itemReducer,
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers()

export const store = createStore(rootReducer, enhancer);

(window as any).gStore = store