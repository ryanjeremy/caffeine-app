export const fetchSources = (connection) =>
    new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `sources`', (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
