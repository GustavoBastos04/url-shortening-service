import express from 'express';
import {getURLbyShortCode} from '../db/urls';

export const retrievingUrlStatistics = async (req: express.Request, res: express.Response) => {
    try {
        const { shortCode } = req.params;

        if (typeof shortCode !== 'string' || !shortCode) {
            return res.sendStatus(400);
        }

        const url = await getURLbyShortCode(shortCode);
        
        if(!url) {
            return res.sendStatus(404);
        }
        const response = {
            "id": url._id,
            "url": url.url,
            "shortCode": url.shortCode,
            "createdAt": url.createdAt,
            "updatedAt": url.updatedAt,
            "accessCount": url.accessCount
        }
        return res.status(200).json(response).end();

    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}