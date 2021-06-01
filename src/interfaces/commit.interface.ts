import { Document } from 'mongoose';


export interface CommitInterface extends Document {
    repository: string,
    changedFiles: string[],
}