import express from 'express';

import { deleteShortCodeByShortCodeName } from '../db/urls';

export const deletingShortCode = async (req: express.Request, res: express.Response) => {
    try {
        const {shortCode} = req.params;

        if(typeof shortCode !== 'string' || !shortCode) {
            return res.sendStatus(400)
        }

        const deleteShortCode = await deleteShortCodeByShortCodeName(shortCode)
        
        if(!deleteShortCode) {
            return res.sendStatus(400)
        }

        return res.json(deleteShortCode)

    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}