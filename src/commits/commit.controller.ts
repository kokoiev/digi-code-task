import { Controller, Get, HttpService, Post } from '@nestjs/common';
import { CommitService } from './commit.service';

@Controller('commits')
export class CommitController {

    constructor(
        private commitService: CommitService,
       ) {
              
    }

    @Post()
    create() {

    }
}
