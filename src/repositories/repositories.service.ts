import {HttpService, Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {CreateRepositoryDto} from './dto/create-repository.dto';
import {CommitService} from "../commits/commit.service";
import {RepositoryInterface} from "../interfaces/repository.interface";
import {ModelNames} from "../enums/model.names";
import {CommitInterface} from "../interfaces/commit.interface";
import {GithubApiService} from "../gihub.api/github.api.service";
import {UpdateRepositoryDto} from "./dto/update-repositiry.dto";


@Injectable()
export class RepositoriesService {

    constructor(
        @Inject(CommitService)
        private commitService: CommitService,
        @Inject(GithubApiService)
        private githubApiService: GithubApiService,
        @Inject(ModelNames.REPOSITORIES)
        private repositoryModel: Model<RepositoryInterface>,
        private httpService: HttpService,
    ) {
    }

    async getAll(): Promise<RepositoryInterface[]> {
        return this.repositoryModel.find().exec()
    }

    async getById(id): Promise<any> {
        const repo = await this.repositoryModel.findById(id);
        const allCommit = await this.commitService.getByRepoId(id);
        const fullResult = {
            repo: repo,
            commit: allCommit,
        };
        return fullResult;

        // return this.repositoryModel.findById(id)
    }

    async create(createRepositoryDto: CreateRepositoryDto) {
        const repos = await this.repositoryModel.insertMany(createRepositoryDto.links.map(link => ({link})));

        const response = repos.map(async repo => {
            const {repoName, owner} = this.parseUrl(repo.link);
            const pulls = await this.githubApiService.getPulls(repoName, owner);

            const shaArray = [];
            const commitArray = [];

            pulls.data.map(e => shaArray.push(e.head.sha));
            for (const sha of shaArray) {
                const oneCommit = await this.githubApiService.getCommit(repoName, owner, sha);
                commitArray.push(...oneCommit.data.files.map(file => file))
            }

            return this.filesCounter(repo.id, commitArray);
        })
        return Promise.all(response);
    }

    async remove(id: string): Promise<any> {
        await this.commitService.removeByRepositoryId(id);
        return this.repositoryModel.deleteOne({_id: id});
    }

    async update(id: string, repositoryDto: UpdateRepositoryDto): Promise<RepositoryInterface> {
        return this.repositoryModel.findByIdAndUpdate(id, repositoryDto, {new: true});
    }

    filesCounter(repoId: string, changedFiles: any[]) {
        const changedFilesWithCounters = changedFiles.reduce((acc, file) => {
            if (!acc[file.filename]) {
                acc[file.filename] = 1;
            } else {
                acc[file.filename]++;
            }

            return acc;
        }, {});
        const filteredFiles = Object.keys(changedFilesWithCounters).reduce((acc, file) => {
            if (changedFilesWithCounters[file] > 1) {
                acc[file] = changedFilesWithCounters[file];

            }
            return acc;
        }, {})

        return this.commitService.create({
            repository: repoId,
            changedFiles: Object.keys(filteredFiles).map(fileName => ({
                fileName,
                count: filteredFiles[fileName],
            }))
        } as CommitInterface);
    }

    private parseUrl(url: string): { repoName: string, owner: string } {
        const owner = url.split("/")[3];
        const repoName = url.split("/")[4];
        return {repoName, owner};
    }
}
