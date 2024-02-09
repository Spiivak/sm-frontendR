import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import { shiftReducer } from './actions/shift.action';

// import { selectedTaskReducer } from './reducers/selected-task.reducer'

const rootReducer = combineReducers({
  shiftModule: shiftReducer,
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers()

export const store = createStore(rootReducer, enhancer);

(window as any).gStore = store