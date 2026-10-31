import express from 'express';
import {getURLbyShortCode} from '../db/urls';

export const retrieveingOriginalUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { shortCode } = req.params;

        if (typeof shortCode !== 'string' || !shortCode) {
            return res.sendStatus(400);
        }

        const url = await getURLbyShortCode(shortCode);
        
        if(!url) {
            return res.sendStatus(400);
        }

        return res.status(200).json(url).end();

    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}