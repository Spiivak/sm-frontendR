export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'

interface LoadingStartAction {
  type: typeof LOADING_START;
}

interface LoadingDoneAction {
  type: typeof LOADING_DONE;
}

type SystemActionTypes = LoadingDoneAction | LoadingStartAction;


interface SystemState {
  isLoading: boolean
}

const initialState: SystemState = {
  isLoading: false
};

export function systemReducer(state: SystemState = initialState, action: SystemActionTypes): SystemState {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    default: return state
  }
}
