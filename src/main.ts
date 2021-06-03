import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());


    const config = new DocumentBuilder()
        .setTitle('DIGICODE')
        .setDescription('Анализ Коммитов репозитория')
        .setVersion('1.0.0')
        .addTag('Backand curse NestJS')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)
    await app.listen(PORT, () => console.log(`Server started at ${PORT}`)) 
};

start();
