import {HttpService, Injectable, NestMiddleware, HttpModule} from '@nestjs/common';
import {Request, Response, NextFunction, response} from 'express';

@Injectable()
export class ArrayParseMiddleware implements NestMiddleware {

    constructor(private httpService: HttpService) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const repoLink = req.body;

        await repoLink.links.map(async (link) => {

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
            const result = resultReduce.result.sort(function (a, b) {
                return resultReduce.map.get(b) - resultReduce.map.get(a);
            });
            console.log(result);
            next();
        });
    }
}
    
      
      

    