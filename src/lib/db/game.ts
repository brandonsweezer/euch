import { MongoClient, ObjectId } from "mongodb"
import { APP_DB_NAME, Repository } from "./container";
import { Game } from "@/types/game";

const GAME_COLLECTION_NAME = 'games'

export type NewGameRequest = Omit<Game, '_id'>;

export interface GameRepository extends Repository<Game, string, NewGameRequest> {

}

export class MongoDBGameRepository implements GameRepository {
    client: MongoClient;
    constructor({ mongoClient }: { mongoClient: MongoClient }) {
        this.client = mongoClient;
    }

    async readById(id: string): Promise<Game> {
        try {
            const objectId = new ObjectId(id);
            await this.client.connect();
            const game = await this.client.db(APP_DB_NAME).collection(GAME_COLLECTION_NAME).findOne(
                {
                    _id: objectId,
                }
            );
            if (game === null) {
                throw new Error(`game not found with _id ${id}`);
            }
            return game as unknown as Game;
        } catch (e) {
            throw new Error(`failed when accessing game db ${e}`)
        } finally {
            try {
                await this.client.close();
            } catch (e) {
                throw new Error('failed to close mongo client');
            }
        }
    }

    async update(newObject: Game): Promise<Game> {
        try {
            await this.client.connect();
            const objectId = new ObjectId(newObject._id)
            const { acknowledged, modifiedCount } = await this.client.db(APP_DB_NAME).collection(GAME_COLLECTION_NAME).replaceOne({
                _id: objectId
            },
                newObject,
            {
                upsert: true,
            }
            )
            if (!acknowledged) {
                console.log('write request not acknowledged!', objectId);
            }
            const game = await this.readById(objectId.toString());
            return game;
        } catch (e) {
            throw new Error(`failed when accessing game db ${e}`)
        } finally {
            try {
                await this.client.close();
            } catch (e) {
                throw new Error('failed to close mongo client');
            }
        }
    }

    async create(newObjectRequest: NewGameRequest): Promise<Game> {
        try {
            await this.client.connect();
            const { acknowledged, insertedId } = await this.client.db(APP_DB_NAME).collection(GAME_COLLECTION_NAME).insertOne(newObjectRequest)
            if (!acknowledged) {
                console.log('write request not acknowledged!', insertedId);
            }
            const game = await this.readById(insertedId.toString());
            return game;
        } catch (e) {
            throw new Error(`failed when accessing game db ${e}`)
        } finally {
            try {
                await this.client.close();
            } catch (e) {
                throw new Error('failed to close mongo client');
            }
        }
    }
    
}