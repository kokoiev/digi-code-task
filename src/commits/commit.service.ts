import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {CommitInterface} from "../interfaces/commit.interface";
import {ModelNames} from "../enums/model.names";


@Injectable()
export class CommitService {

    constructor(
        @Inject(ModelNames.COMMITS)
        private commitModel: Model<CommitInterface>) {
    }
     getAll(): Promise<CommitInterface[]>{
        return this.commitModel.find().exec();
    }

     getByRepoId(id): Promise<CommitInterface[]> {
        return this.commitModel.find({repository: id }).exec();
    }

     create(createCommitDto: CommitInterface){
        try {
            return  this.commitModel.insertMany(createCommitDto);
        }
        catch (e){
            console.log(e);
            return e;
        }



    };

     remove(id: string): Promise<CommitInterface> {
        return this.commitModel.findByIdAndRemove(id).exec();
    }

     removeByRepositoryId(repoId: string): Promise<any> {
        return this.commitModel.deleteMany({repository: repoId}).exec();

    }


}
