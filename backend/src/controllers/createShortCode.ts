import express from 'express';
import { getURLbyShortCode, createShortCode} from '../db/urls';
import { isValidUrl } from '../helpers/validUrl';

const MAX_ATTEMPTS = 5;

function makeShortCode(length: number) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const shortCodeCreation = async(req: express.Request, res: express.Response) => {
    try {
        const {url} = req.body;
        
        const validURL = isValidUrl(url);
        if(!validURL){
            return res.status(400).json({message: 'Invalid URL'});
        }

        let shortCode = '';
        let isShortCodeUnique = false;

        for (let attempt = 0; attempt < MAX_ATTEMPTS && !isShortCodeUnique; attempt++) {
            shortCode = makeShortCode(8);
            isShortCodeUnique = !(await getURLbyShortCode(shortCode));
        }

        if (!isShortCodeUnique) {
            return res.status(500).json({ message: 'Could not generate a unique short code' });
        }

        const urlToCreate = await createShortCode({
            url,
            shortCode
        })

        const response = {
            "id": urlToCreate._id,
            "url": urlToCreate.url,
            "shortCode": urlToCreate.shortCode,
            "createdAt": urlToCreate.createdAt,
            "updatedAt": urlToCreate.updatedAt
        }
        return res.status(201).json(response).end();
    }
    catch (error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error'});
    }
}