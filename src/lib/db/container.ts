import { MongoClient, ServerApiVersion } from "mongodb";
import { MongoDBGameRepository } from "./game";

export const APP_DB_NAME = 'euch';

const client = new MongoClient(process.env.MONGODB_URI ?? '', {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export interface Repository<T, K, N> {
    readMany?(ids: K[]): Promise<Array<T>>;
    readById?(id: K): Promise<T>;
    create?(newObjectRequest: N): Promise<T>;
    update?(newObject: T): Promise<T>;
    delete?(id: K): Promise<boolean>;
}

const gameRepository = new MongoDBGameRepository({ mongoClient: client });


export { gameRepository }