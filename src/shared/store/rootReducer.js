import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import sources from './reducers/sources';

const rootReducer = combineReducers({
    sources,
    router,
});

export default rootReducer;
