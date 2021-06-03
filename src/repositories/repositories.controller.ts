import {Body, Controller, Delete, Get, HttpCode, HttpService, Param, Post, Put,} from '@nestjs/common';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repositiry.dto';
import { RepositoriesService } from './repositories.service';
import {Promise} from "mongoose";
import {RepositoryInterface} from "../interfaces/repository.interface";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('repositories')
export class RepositoriesController {
    constructor(private repoServiсe: RepositoriesService,
    private httpService: HttpService) {
        
    }
    @ApiOperation({summary: "Get All Repositories list"})
    @ApiResponse({status: 200, type: [CreateRepositoryDto] })
    @Get()
    getAll(): Promise<RepositoryInterface[]> {
        return this.repoServiсe.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<RepositoryInterface> {
        return this.repoServiсe.getById(id)
    }

    @ApiOperation({summary: "Creating repository link"})
    @ApiResponse({status: 200, type: CreateRepositoryDto })
    @Post()
    create(@Body() createRepositoryDto: CreateRepositoryDto) {
        return this.repoServiсe.create(createRepositoryDto);

     }
    
    @Delete(':id')
    remove(@Param('id') id: string): Promise<RepositoryInterface> {
        this.httpService.delete('http://localhost:5000/commit/60b8e112a6bec3280c04e9a0')
        return this.repoServiсe.remove(id)
     }

    @Put(':id')
    update(@Body() updateRepositoryDto: UpdateRepositoryDto, @Param('id') id: string) {
        return this.repoServiсe.update(id, updateRepositoryDto)
     }



}
