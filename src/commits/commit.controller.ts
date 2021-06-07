import {Controller, Get, Param} from '@nestjs/common';
import {CommitService} from './commit.service';
import {CommitInterface} from "../interfaces/commit.interface";


@Controller('commit')
export class CommitController {

    constructor(
        private commitService: CommitService,
    ) {
    }

    @Get("/")
    getAll(): Promise<CommitInterface[]> {
        return this.commitService.getAll()
    }


    @Get(':id')
    getOne(@Param('id') id: string): Promise<any> {
        return this.commitService.getByRepoId(id)
    }


}
