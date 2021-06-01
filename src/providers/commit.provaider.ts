import {ModelNames} from "../enums/model.names";
import {Connection} from "mongoose";
import {CommitSchema} from "../commits/schemas/commit.schema";

export const commitProvaider = {
    provide: ModelNames.COMMITS,
    useFactory: (connection: Connection) => connection.model(ModelNames.COMMITS, CommitSchema),
    inject: ['DATABASE_CONNECTION'],
};