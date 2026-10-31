import express from 'express'; 
import { getURLbyShortCode, updateUrlByShortCode } from '../db/urls';

export const updatingUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { url } = req.body;
        const {shortCode} = req.params;

        if (!url) {
            return res.sendStatus(400);
        }

        if (typeof shortCode !== 'string' || !shortCode) {
            return res.sendStatus(400);
        }
    
        const existingUrl = await getURLbyShortCode(shortCode)
        
        if (!existingUrl){
            return res.sendStatus(400);
        }

        existingUrl.url = url;
        await existingUrl?.save();

        return res.status(200).json(existingUrl).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}