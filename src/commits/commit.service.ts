import {Inject, Injectable, Post} from '@nestjs/common';
import {Model} from 'mongoose';
import {CreateCommitDto} from "./dto/create-commit.dto";
import {CommitInterface} from "../interfaces/commit.interface";
import {ModelNames} from "../enums/model.names";
import {RepositoryInterface} from "../interfaces/repository.interface";


@Injectable()
export class CommitService {

    constructor(
        @Inject(ModelNames.COMMITS)
        private commitModel: Model<CommitInterface>) {
    }

    async create(createCommitDto: CommitInterface){
        try {
            return  this.commitModel.insertMany(createCommitDto);
        }
        catch (e){
            console.log(e);
            return e;
        }



    };

    async remove(id: string): Promise<CommitInterface> {
        return this.commitModel.findByIdAndRemove(id)
    }

    async removeByRepositoryId(repoId: string): Promise<any> {
        return this.commitModel.deleteMany({repository: repoId});
    }


}
