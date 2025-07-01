import mongoose from 'mongoose';
import { MongoDBConnectionService, CloseMongoDBConnection } from '../../src/infrastructure/database/mongodb/connection';

jest.setTimeout(10000);

describe('MongoDB connection service', () => {
    beforeAll(async () => {
        (process.env as any).NODE_ENV = 'test';
        await MongoDBConnectionService();
    });

    afterAll(async () => {
        await CloseMongoDBConnection();
    });

    it('Should connect to in-memory MongoDB', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it('Should be able to perform a simple operation', async () => {
        const TestSchema = new mongoose.Schema({ name: String });
        const TestModel = mongoose.model('TestModel', TestSchema);

        const doc = await TestModel.create({ name: 'test' });
        expect(doc.name).toBe('test');

        const count = await TestModel.countDocuments();
        expect(count).toBe(1);
    });
});
