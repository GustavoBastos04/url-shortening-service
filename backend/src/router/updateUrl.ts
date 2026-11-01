import express from 'express';

import { updatingUrl } from '../controllers/updateUrl';

export default (router: express.Router) => {
    router.patch('/shorten/:shortCode', updatingUrl)
};