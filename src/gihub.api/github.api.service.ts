import {HttpService, Inject, Injectable} from "@nestjs/common";

@Injectable()
export class GithubApiService {
    constructor(
        @Inject(HttpService)
        private readonly httpService: HttpService,
    ) {
    }

    public getPulls(repoName: string, owner: string) {
        return this.httpService.get(`/${owner}/${repoName}/pulls`,{
            headers: {
                "Authorization": "token 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"
            }
        }).toPromise();
    }

    public getCommit(repoName: string, owner: string, shaCommit: string) {
        return this.httpService.get(`/${owner}/${repoName}/commits/${shaCommit}`,{
            headers: {
                "Authorization": "token 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"
            }
        }).toPromise()
    }
}
