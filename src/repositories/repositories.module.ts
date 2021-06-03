import { Module, HttpModule } from '@nestjs/common';
import { RepositoriesController } from "./repositories.controller";
import { RepositoriesService } from "./repositories.service";
import {CommitModule} from "../commits/commit.module";
import {databaseProviders} from "../providers/database.provider";
import {repositoriesProvied} from "../providers/repositories.provied";
import {GithubApiModule} from "../gihub.api/github.api.module";


@Module({
    providers: [RepositoriesService, databaseProviders, repositoriesProvied],
    controllers: [RepositoriesController],
    imports: [HttpModule, CommitModule, GithubApiModule],
    exports:[RepositoriesService]

})
export class RepositoriesModule {}