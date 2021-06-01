import {ModelNames} from "../enums/model.names";
import {Connection} from "mongoose";
import {RepositorySchema} from "../repositories/schemas/repository.schema";

export const repositoriesProvied = {
    provide: ModelNames.REPOSITORIES,
    useFactory: (connection: Connection) => connection.model(ModelNames.REPOSITORIES, RepositorySchema),
    inject: ['DATABASE_CONNECTION'],
};