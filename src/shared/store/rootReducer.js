import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import sources from './reducers/sources';
import app from './reducers/app';

const rootReducer = combineReducers({
    app,
    sources,
    router,
});

export default rootReducer;
