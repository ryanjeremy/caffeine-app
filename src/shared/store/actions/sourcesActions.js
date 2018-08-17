import ActionTypes from './actionTypes';
import { getSources } from '../../util/api';

export const setInitialSources = () => {
    return (dispatch) => getSources()
        .then((sources) => dispatch(setSources(sources)))
        .catch((error) => console.log(error));
};

export const setSources = (sources) => ({
    type: ActionTypes.SET_SOURCES,
    sources,
});
