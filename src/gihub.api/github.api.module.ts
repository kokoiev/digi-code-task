import {HttpModule, Module} from "@nestjs/common";
import {GithubApiService} from "./github.api.service";

@Module({
    imports: [HttpModule.register({baseURL: 'https://api.github.com/repos'})],
    exports:[GithubApiService],
    providers: [GithubApiService],
})
export class GithubApiModule{}