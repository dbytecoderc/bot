import { WebClient } from "@slack/web-api";
import { mongoDb } from "./db";
import {
	clearRedisCluster,
	getRedisData,
	setRedisData,
	saveData,
	parseData,
} from "./utils";
import { slackData, slackData2 } from "./mocks";
import { handleInteraction } from "./index";

const webClient = new WebClient('token');

describe("UTILS TEST SUITE", () => {
	beforeAll(async () => await mongoDb.connect());
	beforeEach(async () => {
		// await clearRedisCluster();
	});
	afterEach(async () => {
		await jest.clearAllMocks();
		await mongoDb.db().collection("users").deleteMany({});
		await mongoDb.db().collection("userResponses").deleteMany({});
		await clearRedisCluster();
	});
	afterAll(async () => {
		await mongoDb.close();
	});

	it("should be able to add data to redis", async () => {
		await setRedisData("test", "test");
		const redisData = await getRedisData("test");
		expect(redisData).toEqual("test");
	});

	it("should be able to fetch data from redis", async () => {
		await setRedisData("test", "test");
		const redisData = await getRedisData("test");
		expect(redisData).toEqual("test");
	});

	it("should return null if redis data is not found", async () => {
		const redisData = await getRedisData("test");
		expect(redisData).toEqual(null);
	});

	it("should be able to add ", async () => {
		const redisData = await getRedisData("test");
		expect(redisData).toEqual(null);
	});

	it("should save data after accepting all inputs", async () => {
		const data = await saveData("slackId", {
			greetingResponse: "Doing Well",
			time: "12:00",
			day: "Wednesday",
			favouriteHobby: "Movies",
		});

		const userData = await mongoDb.db().collection("users").findOne({
			slackId: "slackId",
		});

		const userResponseData = await mongoDb
			.db()
			.collection("userResponses")
			.find({
				user: new mongoDb.id(userData._id),
			})
			.toArray();

		expect(data).toEqual(true);
		expect(userData._id).toEqual(userResponseData[0].user);
		expect(userResponseData[0].greetingResponse).toEqual("Doing Well");
		expect(userResponseData[0].time).toEqual("12:00");
		expect(userResponseData[0].day).toEqual("Wednesday");
		expect(userResponseData[0].favouriteHobby).toEqual("Movies");
	});

	it("should be able to process the slack callback", async () => {
		const data = await parseData(slackData);
		const redisData = JSON.parse(await getRedisData(slackData.user.id));
		expect(data).toBe("next");
		expect(redisData.greetingResponse).toBe("Doing Well");
	});

	it("should not call next if day and time is not set", async () => {
		const data = await parseData(slackData2);
		expect(data).toBe("stay");
	});

	it("should call next if day and time is set", async () => {
		await parseData(slackData2);
		slackData2.actions = [
			{
				type: "static_select",
				action_id: "dayTimeSelect",
				block_id: "day",
				selected_option: {
					text: { type: "plain_text", text: "14:30", emoji: false },
					value: "Friday",
				},
				action_ts: "1615052935.560357",
			},
		];
		const data = await parseData(slackData2);
		expect(data).toBe("next");
	});
});
