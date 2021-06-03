import * as mongoose from 'mongoose';

export const RepositorySchema = new mongoose.Schema({
    link: String,
    comment: {type: String, required: false, default: ""}
});



