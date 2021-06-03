import {Inject, Injectable, Post} from '@nestjs/common';
import {Model} from 'mongoose';
import {CreateCommitDto} from "./dto/create-commit.dto";
import {CommitInterface} from "../interfaces/commit.interface";
import {ModelNames} from "../enums/model.names";


@Injectable()
export class CommitService {

    constructor(
        @Inject(ModelNames.COMMITS)
        private commitModel: Model<CommitInterface>) {
    }

    async create(createCommitDto: CommitInterface): Promise<void> {
        try {
            const changedFiles = await this.commitModel.insertMany(createCommitDto);
            console.log('ins many');
        }
        catch (e){
            console.log(e);
        }


    }


}
