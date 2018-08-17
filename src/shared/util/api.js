import axios from 'axios';
import { API_ENDPOINT } from './config';

export const getSources = () => new Promise((resolve, reject) => {
    axios.get(`${API_ENDPOINT}/sources/get`)
        .then((response) => resolve(response.data))
        .catch(reject);
});
