import { fetchSources, insertInput, getAverageServings } from '../db/dbFunc';
import { dispatchMessage, dispatchError } from './api';

export default (action, req, res, connection) => {
    switch (action) {
        case "get":
            fetchSources(connection)
                .then((sources) => dispatchMessage(res, sources))
                .catch(() => dispatchError(res));
            return;
    }
    dispatchError(res, "Invalid action type.");
};
