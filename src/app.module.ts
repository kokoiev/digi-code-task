import {HttpModule, Module} from "@nestjs/common";
import {RepositoriesModule} from './repositories/repositories.module'
import {CommitController} from './commits/commit.controller';
import {CommitModule} from './commits/commit.module';
import {CommitService} from './commits/commit.service';
import {databaseProviders} from "./providers/database.provider";
import {commitProvaider} from "./providers/commit.provaider";
import {repositoriesProvied} from "./providers/repositories.provied";


@Module({
    controllers: [CommitController],
    providers: [CommitService, databaseProviders, commitProvaider, repositoriesProvied],
    imports: [
        HttpModule,
        RepositoriesModule,
        CommitModule,
    ],
})


export class AppModule {
}