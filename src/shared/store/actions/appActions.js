import ActionTypes from './actionTypes';

export const setLoading = (loading, error = null) => ({
    type: ActionTypes.SET_APP_LOADING,
    loading,
    error
});

export const setError = (error, loading = false) => ({
    type: ActionTypes.SET_APP_ERROR,
    error,
    loading
});
