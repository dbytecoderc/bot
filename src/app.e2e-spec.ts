import request from "supertest";
import app from "./index";
import { mongoDb } from "./db";

import { clearRedisCluster, saveData } from "./utils";

describe("END TO END", () => {
	beforeAll(async () => await mongoDb.connect());
	beforeEach(async () => {
		await clearRedisCluster();
	});
	afterEach(async () => {
		await jest.clearAllMocks();
		await mongoDb.db().collection("users").deleteMany({});
		await mongoDb.db().collection("userResponses").deleteMany({});
	});
	afterAll(async () => {
		await mongoDb.close();
	});

  // it('true to be true', () => {
  //   expect(true).toBe(true)
  // })

	it("should be able to get all users", async () => {
		await saveData("slackId", {
			greetingResponse: "Doing Well",
			time: "12:00",
			day: "Wednesday",
			favouriteHobby: "Movies",
		});

		const res = await request(app).get("/api/v1/users");

		expect(res.status).toBe(200);
		expect(res.body.users[0].slackId).toEqual("slackId");
		expect(res.body.users.length).toEqual(1);
	});

	it("should be able to get all users' responses", async () => {
		await saveData("slackId", {
			greetingResponse: "Doing Well",
			time: "12:00",
			day: "Wednesday",
			favouriteHobby: "Movies",
		});

		const res = await request(app).get("/api/v1/user-responses");

		expect(res.status).toBe(200);
		expect(res.body.allResponses.length).toEqual(1);
	});

	it("should be able to get responses for a user", async () => {
		await saveData("slackId", {
			greetingResponse: "Doing Well",
			time: "12:00",
			day: "Wednesday",
			favouriteHobby: "Movies",
		});

		const userData = await mongoDb.db().collection("users").findOne({
			slackId: "slackId",
		});

		const res = await request(app).get(
			`/api/v1/user/${userData._id}/user-responses`
		);

		expect(res.status).toBe(200);
		expect(res.body.userResponses.length).toEqual(1);
		expect(res.body.userResponses[0].greetingResponse).toEqual("Doing Well");
    expect(res.body.userResponses[0].time).toEqual("12:00");
    expect(res.body.userResponses[0].day).toEqual("Wednesday");
    expect(res.body.userResponses[0].favouriteHobby).toEqual("Movies");
    expect(res.body.userResponses[0].user.toString()).toEqual(userData._id.toString());
	});
});
