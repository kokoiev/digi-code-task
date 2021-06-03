import { Controller, Get, HttpService, Post } from '@nestjs/common';
import { CommitService } from './commit.service';

@Controller('commit')
export class CommitController {

    constructor(
        private commitService: CommitService,
       ) {
              
    }
 
}
