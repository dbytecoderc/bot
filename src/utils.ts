import { Request, Response } from "express";
import { redis, mongoDb } from "./db";

export const getRedisData = (input: string) => {
	return redis.get(input);
};

export const setRedisData = (id: string, data: any) => {
	return redis.set(id, data, "ex", 60 * 3);
};

export const removeRedisData = (key: string) => {
	return redis.del(key);
};

export const clearRedisCluster = () => {
	return redis.flushall();
};

export const saveData = async (slackId: string, data: any) => {
	let user;

	user = await mongoDb.db().collection("users").findOne({
		slackId,
	});

	if (!user) {
		user = await mongoDb.db().collection("users").insertOne({
			slackId,
		});
	}

	if (user) {
		await mongoDb
			.db()
			.collection("userResponses")
			.insertOne({
				...data,
				user: new mongoDb.id(user._id || user.insertedId),
			});
	}

	return true;
};

export const users = async (request: Request, response: Response) => {
	try {
		const users = await mongoDb.db().collection("users").find().toArray();
		return response.json({
			status: 200,
			users,
		});
	} catch (error) {
		console.log(error);
	}
};

export const allResponses = async (request: Request, response: Response) => {
  try {
		const allResponses = await mongoDb.db().collection("userResponses").find().toArray();
		return response.json({
			status: 200,
			allResponses,
		});
	} catch (error) {
		console.log(error);
	}
};

export const userResponses = async (request: Request, response: Response) => {
  try {
		const userResponses = await mongoDb.db().collection("userResponses").find({
      user: new mongoDb.id(request.params.userId)
    }).toArray();
		return response.json({
			status: 200,
			userResponses,
		});
	} catch (error) {
		console.log(error);
	}
};

export const parseData = async (payload) => {
	// console.log(payload.actions);
	// console.log(payload.actions[0].selected_option);
	const { action_id, block_id, selected_option } = payload.actions[0];

	try {
		let data;
		data = JSON.parse((await getRedisData(payload.user.id)) as string);

		if (data && selected_option) data[block_id] = selected_option.value;
		if (!data) {
			data = {};
			data[block_id] = selected_option.value;
		}

		if (data.greetingResponse && data.time && data.day && data.favouriteHobby) {
			await saveData(payload.user.id, data);
			await removeRedisData(payload.user.id);
			return "next";
		} else {
			await setRedisData(payload.user.id, JSON.stringify(data));
		}

		if (action_id === "dayTimeSelect") {
			if (data.time && data.day) {
				return "next";
			}
			return "stay";
		}
		return "next";
	} catch (error) {
		console.log(error.message);
	}
};