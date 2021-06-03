import {HttpService, Inject, Injectable} from "@nestjs/common";

@Injectable()
export class GithubApiService {
    constructor(
        @Inject(HttpService)
        private readonly httpService: HttpService,
    ) {
    }

    public getPulls(repoName: string, owner: string) {
        return this.httpService.get(`/${owner}/${repoName}/pulls`).toPromise();
    }

    public getCommit(repoName: string, owner: string, shaCommit: string) {
        return this.httpService.get(`/${owner}/${repoName}/commits/${shaCommit}`).toPromise()
    }
}
