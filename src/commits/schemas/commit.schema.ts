import * as mongoose from 'mongoose';
import {RepositorySchema} from "../../repositories/schemas/repository.schema";

export const CommitSchema = new mongoose.Schema({
    repository: { type: mongoose.Schema.Types.ObjectId, ref: 'repositories' },
    changedFiles: {type: Array}
});
