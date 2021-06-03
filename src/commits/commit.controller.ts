import {Controller, Delete, Get, HttpService, Inject, Param, Post} from '@nestjs/common';
import { CommitService } from './commit.service';
import {CommitInterface} from "../interfaces/commit.interface";


@Controller('commit')
export class CommitController {

    constructor(
        private commitService: CommitService,
        private httpService: HttpService
       ){}

    @Delete(':id')
    remove(@Param('id') id: string): Promise<CommitInterface> {
        return this.commitService.remove(id)
    }
 
}
