import {HttpService, Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {CreateRepositoryDto} from './dto/create-repository.dto';
import {CommitService} from "../commits/commit.service";
import {RepositoryInterface} from "../interfaces/repository.interface";
import {ModelNames} from "../enums/model.names";
import {CommitInterface} from "../interfaces/commit.interface";


@Injectable()
export class RepositoriesService {

    constructor(
        @Inject(CommitService)
        private commitService: CommitService,
        @Inject(ModelNames.REPOSITORIES)
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
        const repo = await this.repositoryModel.insertMany(createRepositoryDto.links.map(link => ({link})));
        await this.filesCounter(repo);
    }

    async remove(id: string): Promise<RepositoryInterface> {
        return this.repositoryModel.findByIdAndRemove(id)
    }

    async update(id: string, repositoryDto: CreateRepositoryDto): Promise<RepositoryInterface> {
        return this.repositoryModel.findByIdAndUpdate(id, repositoryDto, {new: true})
    }

    async filesCounter(repos: RepositoryInterface[]) {

        await repos.map(async (repo) => {

            const apiUrl = "https://api.github.com/repos"
            const owner = repo.link.split("/")[3]
            const repoName = repo.link.split("/")[4]
            const getPulls = await this.httpService.get(`${apiUrl}/${owner}/${repoName}/pulls`).toPromise();
            const shaCommit = getPulls.data[0].head.sha;
            const getCommits = await this.httpService.get(`${apiUrl}/${owner}/${repoName}/commits/${shaCommit}`).toPromise();

            const filesArray = getCommits.data.files;

            const changedFiles = filesArray.map(i => {
                return i.filename
            }).reduce(function (acc, fileName) {
                    if (!acc[fileName]) {
                        acc[fileName] = 1;
                    } else {
                        acc[fileName]++;
                    }

                    return acc;
                },
                {});
            await this.commitService.create({
                repository: repo.id, changedFiles: Object.keys(changedFiles).map(fileName => ({
                    fileName,
                    count: changedFiles[fileName],
                }))
            } as CommitInterface);
        });
    }
}
