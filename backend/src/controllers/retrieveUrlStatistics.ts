import express from 'express';
import {getURLbyShortCode} from '../db/urls';

export const retrievingUrlStatistics = async (req: express.Request, res: express.Response) => {
    try {
        const { shortCode } = req.params;

        if (typeof shortCode !== 'string' || !shortCode) {
            return res.status(400).json({message: 'Invalid short code'});
        }

        const url = await getURLbyShortCode(shortCode);
        
        if(!url) {
            return res.status(404).json({message: 'URL not found'});
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
        return res.status(500).json({message: 'Internal server error'});
    }
}