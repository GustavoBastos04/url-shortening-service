import express from 'express';

import { retrieveingOriginalUrl } from '../controllers/retrieveOriginalUrl';

export default (router: express.Router) => {
    router.get('/shorten/:shortCode', retrieveingOriginalUrl)
};