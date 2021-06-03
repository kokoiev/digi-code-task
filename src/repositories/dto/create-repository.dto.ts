import {IsArray, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";



export class CreateRepositoryDto {

    @ApiProperty({example: '["https://github.com/nestjs/nest"]', description: 'ссылка на репозиторий'})
    @IsString({ each: true })
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    readonly links: string[]
}