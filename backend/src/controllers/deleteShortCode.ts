import express from 'express';

import { deleteShortCodeByShortCodeName } from '../db/urls';

export const deletingShortCode = async (req: express.Request, res: express.Response) => {
    try {
        const {shortCode} = req.params;

        if(typeof shortCode !== 'string' || !shortCode) {
            return res.status(400).json({message: 'Invalid short code'});
        }

        const deleteShortCode = await deleteShortCodeByShortCodeName(shortCode)
        
        if(!deleteShortCode) {
            return res.status(404).json({message: 'Short code not found'})
        }

        return res.sendStatus(204);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'});
    }
}