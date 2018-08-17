import ActionTypes from './actionTypes';
import { setLoading, setError } from './appActions';
import { getSources } from '../../util/api';

export const setInitialSources = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        getSources()
            .then((sources) => {
                dispatch(setSources(sources));
                dispatch(setLoading(false));
            })
            .catch(() => {
                dispatch(setError(true, 'Network error!'));
            });
    }
};

export const setSources = (sources) => ({
    type: ActionTypes.SET_SOURCES,
    sources,
});
