import db from './db';

export const fetchSources = (con = null) =>
    new Promise((resolve, reject) => {
        const connection = con || db();
        connection.query('SELECT * FROM `sources`', (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
