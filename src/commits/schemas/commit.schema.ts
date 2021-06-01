import * as mongoose from 'mongoose';

export const CommitSchema = new mongoose.Schema({
    repository: {type: mongoose.Schema.Types.ObjectId, ref: 'Repositories'},
    changedFiles: {type: Array}
});
