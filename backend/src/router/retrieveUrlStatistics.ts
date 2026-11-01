import express from 'express';

import { retrievingUrlStatistics } from '../controllers/retrieveUrlStatistics';

export default (router: express.Router) => {
    router.get('/shorten/:shortCode/stats', retrievingUrlStatistics)
};