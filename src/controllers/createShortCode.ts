import express from 'express';
import { getURLbyShortCode, createShortCode} from '../db/urls';

function makeShortCode(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const shortCodeCreation = async(req: express.Request, res: express.Response) => {
    try {
        const {url} = req.body;
        const shortCode = makeShortCode(8);
        if(!shortCode || !url){
            return res.sendStatus(400);
        }

        const existingShortCode = await getURLbyShortCode(shortCode);

        if (existingShortCode) {
            return res.sendStatus(400);
        }

        const urlToCreate = await createShortCode({
            url,
            shortCode
        })

        return res.status(201).json(urlToCreate).end();
    }
    catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}