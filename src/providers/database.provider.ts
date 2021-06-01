import * as mongoose from 'mongoose';

export const databaseProviders = {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect('mongodb+srv://tester:firsttester@cluster0.66qw1.mongodb.net/rep-links?retryWrites=true&w=majority'),
};