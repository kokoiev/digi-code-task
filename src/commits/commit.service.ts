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

    async create(createCommitDto: CreateCommitDto): Promise<void> {
        const changedFiles = await this.commitModel.create(createCommitDto);
        await changedFiles.save(createCommitDto)
    }


}
