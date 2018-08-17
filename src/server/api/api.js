import SourcesApi from './sourcesApi';

const dispatchResponse = (res, status, response) =>
    res.status(status).send(response);

export const dispatchError = (res, error = "There was an error processing your request.", status = 400) =>
    dispatchResponse(res, status, {
        error
    });

export const dispatchMessage = (res, message) =>
    dispatchResponse(res, 200, message);

export default (req, res) => {
    const resource = req.params.resource;
    const action = req.params.action;
    switch (resource) {
        case "sources":
            SourcesApi(action, res);
            return;
    }
    dispatchError(res, "Invalid resource.");
};
