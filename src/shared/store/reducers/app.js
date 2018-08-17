import ActionTypes from '../actions/actionTypes';

const DEFAULT_APP_STATE = {
    loading: true,
    error: null
};

export default (state = DEFAULT_APP_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SET_APP_LOADING:
        case ActionTypes.SET_APP_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error
            };
    }
    return state;
}
