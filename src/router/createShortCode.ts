import express from 'express';

import { shortCodeCreation} from '../controllers/createShortCode';

export default (router: express.Router ) => {
    router.post('/shorten', shortCodeCreation)
};