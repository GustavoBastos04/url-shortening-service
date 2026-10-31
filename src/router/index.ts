import express from 'express';
import createShortCode from './createShortCode';
import retrieveOriginalUrl from './retrieveOriginalUrl';
import retrieveUrlStatistics from './retrieveUrlStatistics';
import deleteShortCode from './deleteShortCode';
import updateUrl from './updateUrl';
const router = express.Router();

export default(): express.Router => {
    createShortCode(router);
    retrieveOriginalUrl(router);
    retrieveUrlStatistics(router);
    deleteShortCode(router);
    updateUrl(router);
    return router;
};
