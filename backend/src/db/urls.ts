import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
    url: {type: String, required: true},
    shortCode: {type: String, unique: true, required: true},
    accessCount: {type: Number, default: 0},
    },
    {timestamps: true}
);

export const URLModel = mongoose.model('URL', URLSchema);

export const getAccessCountByShortCode = (shortCode: string) => URLModel.findOne({shortCode});
export const getURLbyShortCode = (shortCode: string) => URLModel.findOne({shortCode});
export const createShortCode = (values: Record<string, any>) => new URLModel(values).save().then((url) => url.toObject());
export const deleteShortCodeByShortCodeName = (shortCode: string) => URLModel.findOneAndDelete({ shortCode });
export const updateUrlByShortCode = (shortCode: string, values: Record<string, any>) => URLModel.findOneAndUpdate({ shortCode }, values)
export const incrementAccessCount = (shortCode: string) => URLModel.findOneAndUpdate( 
    {shortCode},
    { $inc: {accessCount: 1} },
    {new: true}
);