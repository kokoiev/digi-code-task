import {ApiProperty} from "@nestjs/swagger";

export class CreateCommitDto {

    @ApiProperty({example: '[{fileName: "package-lock.json, count: "3"}]', description: 'массив изменееных файлов'})
    readonly changedFiles: any
}