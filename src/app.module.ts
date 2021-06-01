import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { RepositoriesModule } from './repositories/repositories.module'
import { AppController } from './app.controller'
import { CommitController } from './commits/commit.controller';
import { CommitModule } from './commits/commit.module';
import { CommitService } from './commits/commit.service';
import {databaseProviders} from "./providers/database.provider";


@Module({
    controllers: [AppController, CommitController],
    providers: [AppService, CommitService, databaseProviders ],
    imports: [
        RepositoriesModule,
        CommitModule,
        ]
    })
export class AppModule {}