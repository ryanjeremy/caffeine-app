export const API_ENDPOINT = process.env.NODE_ENV === 'development' ?
    `http://localhost:${process.env.PORT || 8500}/api` :
    ``;
