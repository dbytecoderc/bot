import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";
import { MongoClient, Db, ObjectID } from "mongodb";

const REDIS_URL: string = process.env.REDIS_URL;

let db: Db, client: MongoClient;

export const mongoDb = {
	id: ObjectID,
	db: () => {
		return db;
	},
	client: () => {
		return client;
	},
	connect: async () => {
		client = new MongoClient(
			process.env.NODE_ENV === "test"
				? process.env.TEST_DB_URL
				: process.env.DB_URL,
			{
				poolSize: 20,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);

		await client.connect();
		db = client.db(
			process.env.NODE_ENV === "test"
				? process.env.TEST_DB_NAME
				: process.env.DB_NAME
		);
	},
	close: async () => {
		return client.close();
	},
};

export const redis = new Redis(REDIS_URL);
