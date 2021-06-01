import { HttpModule, Module } from '@nestjs/common';
import { CommitController } from './commit.controller';
import { CommitService } from './commit.service';
import {databaseProviders} from "../providers/database.provider";
import {commitProvaider} from "../providers/commit.provaider";


@Module({
  providers: [CommitService, databaseProviders, commitProvaider],
  controllers: [CommitController],
  imports: [HttpModule],
  exports:[CommitService],
})
export class CommitModule {}
