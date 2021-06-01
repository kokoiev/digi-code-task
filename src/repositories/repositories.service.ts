import {HttpService, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateRepositoryDto} from './dto/create-repository.dto';
import {RepositorySchema} from './schemas/repository.schema';
import {CommitService} from "../commits/commit.service";
import {RepositoryInterface} from "../interfaces/repository.interface";
import {ModelNames} from "../enums/model.names";



@Injectable()
export class RepositoriesService {

    constructor(
        @Inject(CommitService)
        private commitService: CommitService,
        @InjectModel(ModelNames.REPOSITORIES)
        private repositoryModel: Model<RepositoryInterface>,
        private httpService: HttpService,
    ) {
    }


    async getAll(): Promise<RepositoryInterface[]> {
        return this.repositoryModel.find().exec()
    }

    async getById(id: string): Promise<RepositoryInterface> {
        return this.repositoryModel.findById(id)
    }

    async create(createRepositoryDto: CreateRepositoryDto): Promise<void> {
        await this.repositoryModel.insertMany(createRepositoryDto.links.map(link => ({link})));
        await this.filesCounter(createRepositoryDto.links);
    }

    async remove(id: string): Promise<RepositoryInterface> {
        return this.repositoryModel.findByIdAndRemove(id)
    }

    async update(id: string, repositoryDto: CreateRepositoryDto): Promise<RepositoryInterface> {
        return this.repositoryModel.findByIdAndUpdate(id, repositoryDto, {new: true})
    }

    async filesCounter(links: string[]) {

        await links.map(async (link) => {

            const apiUrl = "https://api.github.com/repos"
            const owner = link.split("/")[3]
            const repo = link.split("/")[4]
            const getPulls = await this.httpService.get(`${apiUrl}/${owner}/${repo}/pulls`).toPromise();
            const shaCommit = getPulls.data[0].head.sha;
            const getCommits = await this.httpService.get(`${apiUrl}/${owner}/${repo}/commits/${shaCommit}`).toPromise();

            const filesArray = getCommits.data.files;

            const resultReduce = filesArray.map(i => {
                return i.filename
            }).reduce(function (acc, cur) {
                if (!acc.hash[cur]) {
                    acc.hash[cur] = {[cur]: 1};
                    acc.map.set(acc.hash[cur], 1);
                    acc.result.push(acc.hash[cur]);
                } else {
                    acc.hash[cur][cur] += 1;
                    acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
                }
                return acc;
            }, {
                hash: {},
                map: new Map(),
                result: []
            });
            const result = resultReduce.result.sort((a, b)=> {
                return resultReduce.map.get(b) - resultReduce.map.get(a);






            });
            console.log(result);
        });
    }
}
