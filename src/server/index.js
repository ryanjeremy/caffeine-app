import express from 'express';
import cors from 'cors';
import path from 'path';
import manifestHelpers from 'express-manifest-helpers';
import bodyParser from 'body-parser';
import { configureStore } from '../shared/store';
import serverRender from './render';
import paths from '../../config/paths';
import { logNotice, logError } from './util/log';
import db from './db/db';
import dbInit from './db/dbInit';
import api from './api/api';

require('dotenv').config();

const connectionPool = db();
const apiFunc = (req, res) => api(req, res, connectionPool);
const app = express();

app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
app.use('/favicon.ico', (req, res) => {
    res.send('');
});

app.use(cors());
app.use(bodyParser.json());

app.route('/api/:resource/:action')
  .get(apiFunc)
  .post(apiFunc);

app.use((req, res, next) => {
    req.store = configureStore();
    return next();
});

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`,
    })
);

app.use(serverRender());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    return res.status(400).json({
        status: 'error',
        message: err.message,
        stack:
            // print a nicer stack trace by splitting line breaks and making them array items
            process.env.NODE_ENV === 'development' &&
            (err.stack || '')
                .split('\n')
                .map((line) => line.trim())
                .map((line) => line.split(path.sep).join('/'))
                .map((line) =>
                    line.replace(
                        process
                            .cwd()
                            .split(path.sep)
                            .join('/'),
                        '.'
                    )
                ),
    });
});

const listen = () =>
    app.listen(process.env.PORT || 8500, () => {
        logNotice(`Running on port ${process.env.PORT || 8500}`);
    });

const init = () =>
    connectionPool.getConnection(error => {
        if (error) {
            switch (error.code) {
                default:
                    logError('Error connecting to DB... Retrying in 5 seconds...');
                    setTimeout(init, 5000);
                    break;
                case 'ER_BAD_DB_ERROR':
                    logNotice('Initializing DB...');
                    dbInit(logError, () => {
                        logNotice('Successfully initialized DB');
                        listen();
                    });
                    break;
            }
        } else {
            listen();
        }
    });

init();

export default app;

export const test = 'FOO';
