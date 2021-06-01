import { Body, Controller, Delete, Get, HttpService, Param, Post, Put,  } from '@nestjs/common';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repositiry.dto';
import { RepositoriesService } from './repositories.service';
import {Promise} from "mongoose";
import {RepositoryInterface} from "../interfaces/repository.interface";

@Controller('repositories')
export class RepositoriesController {
    constructor(private repoServiсe: RepositoriesService,
    private httpService: HttpService) {
        
    }

    @Get()
    getAll(): Promise<RepositoryInterface[]> {
        return this.repoServiсe.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<RepositoryInterface> {
        return this.repoServiсe.getById(id)
    }

    @Post()
    createLink(){}


    @Post()
    create(@Body() createRepositoryDto: CreateRepositoryDto): Promise<void> {
        return this.repoServiсe.create(createRepositoryDto)
     }
    
    @Delete(':id')
    remove(@Param('id') id: string): Promise<RepositoryInterface> {
        return this.repoServiсe.remove(id)
     }

    @Put(':id')
    update(@Body() updateRepositoryDto: UpdateRepositoryDto, @Param('id') id: string) {
        return this.repoServiсe.update(id, updateRepositoryDto)
     }



}
