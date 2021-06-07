import {Controller, Delete, Get, HttpService, Inject, Param, Post} from '@nestjs/common';
import { CommitService } from './commit.service';
import {CommitInterface} from "../interfaces/commit.interface";
import {ApiOperation} from "@nestjs/swagger";
import {filter} from "rxjs/operators";


@Controller('commit')
export class CommitController {

    constructor(
        private commitService: CommitService,
        private httpService: HttpService
       ){}

    @Get("/")
    getAll(): Promise<CommitInterface[]>{
        return this.commitService.getAll()
    }


    @Get(':id')
    getOne(@Param('id') id: string): Promise<any> {
        return this.commitService.getByRepoId(id)
    }



 
}
