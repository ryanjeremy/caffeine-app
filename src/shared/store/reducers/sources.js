import ActionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case ActionTypes.SET_SOURCES:
            return action.sources;
    }
    return state;
};
