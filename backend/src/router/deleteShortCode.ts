import express from 'express';

import { deletingShortCode } from '../controllers/deleteShortCode';

export default (router: express.Router) => {
    router.delete('/shorten/:shortCode', deletingShortCode)
};