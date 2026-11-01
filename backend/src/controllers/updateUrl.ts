import express from 'express'; 
import { getURLbyShortCode} from '../db/urls';
import { isValidUrl } from '../helpers/validUrl';

export const updatingUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { url } = req.body;
        const {shortCode} = req.params;

        if (!isValidUrl(url)) {
            return res.status(400).json({message: 'Invalid URL'});
        }

        if (typeof shortCode !== 'string' || !shortCode) {
            return res.status(400).json({message: 'Invalid Short code'});
        }
    
        const existingUrl = await getURLbyShortCode(shortCode)
        
        if (!existingUrl){
            return res.status(404).json({message: 'URL not found'});
        }

        existingUrl.url = url;
        await existingUrl.save();

        const response = {
            "id": existingUrl._id,
            "url": existingUrl.url,
            "shortCode": existingUrl.shortCode,
            "createdAt": existingUrl.createdAt,
            "updatedAt": existingUrl.updatedAt,
        }
        return res.status(200).json(response).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal server error'});
    }
}