import dotenv from "dotenv";
dotenv.config();
import http from "http";
import express, { Application } from "express";
import bodyParser from "body-parser";
import { WebClient } from "@slack/web-api";
import { createEventAdapter } from "@slack/events-api";
import { createMessageAdapter } from "@slack/interactive-messages";

import {
	messageJsonBlock,
	dayTimeBlock,
	favoriteHobbies,
	thankYou,
} from "./ui-templates";

import {
	parseData,
	users,
  allResponses,
  userResponses
} from "./utils";
import { mongoDb } from "./db";

export const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
export const slackAccessToken = process.env.SLACK_ACCESS_TOKEN;

if (!slackSigningSecret || !slackAccessToken) {
	throw new Error(
		"A Slack signing secret and access token are required to run this app."
	);
}

const slackEvents = createEventAdapter(slackSigningSecret, {
	includeBody: true,
});
const webClient = new WebClient(slackAccessToken);
const slackInteractions = createMessageAdapter(slackSigningSecret);

const app: Application = express();
const apiPrefix: string = "/api/v1";

// Plug the adapter in as a middleware
app.use(`${apiPrefix}/slack/events`, slackEvents.expressMiddleware());
app.use(`${apiPrefix}/slack/actions`, slackInteractions.expressMiddleware());
app.get(`${apiPrefix}/users`, users);
app.get(`${apiPrefix}/user-responses`, allResponses);
app.get(`${apiPrefix}/user/:userId/user-responses`, userResponses);

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

(async function () {
	try {
		await mongoDb.connect();
	} catch (error) {
		console.log(error);
		setTimeout(() => {
			process.exit(0);
		}, 3000);
	}
})();

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

slackEvents.on("app_mention", async (event) => {
	try {
		const mentionResponseBlock = {
			...messageJsonBlock,
			...{ channel: event.channel },
		};
		const res = await webClient.chat.postMessage(mentionResponseBlock as any);
		console.log("Message sent: ", res.ts);
	} catch (e) {
		console.log(e.message);
	}
});

slackInteractions.action({ actionId: "greetingResponse" }, async (payload) => {
	await handleInteraction(payload, dayTimeBlock);
});

slackInteractions.action({ actionId: "dayTimeSelect" }, async (payload) => {
	await handleInteraction(payload, favoriteHobbies);
});

slackInteractions.action({ actionId: "favouriteHobby" }, async (payload) => {
	await handleInteraction(payload, thankYou);
});

export const handleInteraction = async (payload, block) => {
	try {
		const response = await parseData(payload);
		if (response === "next") {
			await webClient.chat.update({
				...block,
				...{ channel: payload.channel.id, ts: payload.message.ts },
			} as any);
		}
	} catch (error) {
		console.log(error.message);
	}
};

slackEvents.on("error", console.error);

server.listen(PORT);

server.on("listening", async () => {
	console.info(`Listening on port ${PORT}`);
});

export default app
