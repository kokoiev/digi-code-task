import * as mongoose from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export const RepositorySchema = new mongoose.Schema({

    commit: {type: mongoose.Schema.Types.ObjectId, ref: 'commits'},
    link: String,
    comment: {type: String, required: false, default: ""}
});



