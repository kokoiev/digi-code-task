import * as mongoose from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import {CommitSchema} from "../../commits/schemas/commit.schema";

export const RepositorySchema = new mongoose.Schema({
    link: String,
    comment: {type: String, required: false, default: ""}
});
