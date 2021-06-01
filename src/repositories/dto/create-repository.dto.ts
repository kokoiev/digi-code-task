import {IsArray, IsString} from "class-validator";
import {Transform} from "class-transformer";



export class CreateRepositoryDto {
    @IsString({ each: true })
    @IsArray()
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    readonly links: string[]

}