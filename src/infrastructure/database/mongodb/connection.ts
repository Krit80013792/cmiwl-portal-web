import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

/**
 * Establishes a connection to MongoDB.
 * - Uses an in-memory database for testing.
 * - Connects to the production database otherwise.
 *
 * @param {string} [uri] - Optional MongoDB connection URI (used for testing).
 */
export async function MongoDBConnectionService(uri?: string) {
    try {
        if (mongoose.connection.readyState === 1) return;

        if (process.env.NODE_ENV === 'test') {
            const mongoUri = uri ?? (await StartInMemoryMongoDB());
            await mongoose.connect(mongoUri, {
                dbName: 'test',
            });
            console.log(`✅ Connected to MongoDB at ${mongoUri}`);
        }
        else {
            const mongoUri = process.env.MONGODB_URI ?? '';
            await mongoose.connect(mongoUri, {});
        }
    } catch (error) {
        console.error(`DB Connection failed : `, error);
    }
};

/**
 * Starts an in-memory MongoDB instance for testing purposes.
 *
 */
async function StartInMemoryMongoDB() {
    mongoServer = await MongoMemoryServer.create();
    return mongoServer.getUri();
};

/**
 * Closes the MongoDB connection and stops the in-memory database if running.
 *
 */
export async function CloseMongoDBConnection() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) await mongoServer.stop();
};
