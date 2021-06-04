import {ApiProperty} from "@nestjs/swagger";

export class UpdateRepositoryDto {
    @ApiProperty({example: 'https://github.com/nestjs/nest', description: 'одна ссылка уже без массива прошу заметить ;), но даже если будет в массиве мы ёё вытащим не волнуйтесь'})
    readonly link: string

    @ApiProperty({example: 'репозиторий NestJS docs и бла-бла-бла....', description: 'ваш коментарий к репозиторию......'})
    comment: string
}