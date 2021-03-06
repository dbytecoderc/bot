export const messageJsonBlock = {
	blocks: [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "Welcome. How are you doing?",
			},
		},
		{
			type: "divider",
		},
		{
			type: "actions",
      block_id: 'greetingResponse',
			elements: [
				{
					type: "static_select",
					placeholder: {
						type: "plain_text",
						text: "Select an item",
						emoji: true,
					},
					options: [
						{
							text: {
								type: "plain_text",
								text: "Doing Well",
								emoji: true,
							},
							value: "Doing Well",
						},
						{
							text: {
								type: "plain_text",
								text: "Neutral",
								emoji: true,
							},
							value: "Neutral",
						},
						{
							text: {
								type: "plain_text",
								text: "Feeling Lucky",
								emoji: true,
							},
							value: "Feeling lucky",
						},
					],
					action_id: "greetingResponse",
				},
			],
		},
	],
};

export const dayTimeBlock = {
	blocks: [
		{
			type: "header",
			text: {
				type: "plain_text",
				text: "when are you free this week for a walk?",
				emoji: true,
			},
		},
		{
			type: "section",
			block_id: "time",
			text: {
				type: "mrkdwn",
				text: "Select time",
			},
			accessory: {
				type: "static_select",
				action_id: "dayTimeSelect",
				placeholder: {
					type: "plain_text",
					text: "Select a time",
					emoji: false,
				},
				options: [
					{
						text: {
							type: "plain_text",
							text: "12:00",
							emoji: false,
						},
						value: "12:00",
					},
					{
						text: {
							type: "plain_text",
							text: "12:30",
							emoji: false,
						},
						value: "12:30",
					},
					{
						text: {
							type: "plain_text",
							text: "13:00",
							emoji: false,
						},
						value: "13:00",
					},
					{
						text: {
							type: "plain_text",
							text: "13:30",
							emoji: false,
						},
						value: "13:30",
					},
					{
						text: {
							type: "plain_text",
							text: "14:00",
							emoji: false,
						},
						value: "14:00",
					},
					{
						text: {
							type: "plain_text",
							text: "14:30",
							emoji: false,
						},
						value: "14:30",
					},
					{
						text: {
							type: "plain_text",
							text: "15:00",
							emoji: false,
						},
						value: "15:00",
					},
					{
						text: {
							type: "plain_text",
							text: "15:30",
							emoji: false,
						},
						value: "15:30",
					},
					{
						text: {
							type: "plain_text",
							text: "16:00",
							emoji: false,
						},
						value: "16:00",
					},
					{
						text: {
							type: "plain_text",
							text: "16:30",
							emoji: false,
						},
						value: "16:30",
					},
					{
						text: {
							type: "plain_text",
							text: "17:00",
							emoji: false,
						},
						value: "17:00",
					},
					{
						text: {
							type: "plain_text",
							text: "17:30",
							emoji: false,
						},
						value: "17:30",
					},
					{
						text: {
							type: "plain_text",
							text: "18:00",
							emoji: false,
						},
						value: "18:00",
					},
				],
			},
		},
		{
			type: "section",
			block_id: "day",
			text: {
				type: "mrkdwn",
				text: "Select day",
			},
			accessory: {
				type: "static_select",
				action_id: "dayTimeSelect",
				placeholder: {
					type: "plain_text",
					text: "Select a day",
					emoji: false,
				},
				options: [
					{
						text: {
							type: "plain_text",
							text: "Sunday",
							emoji: false,
						},
						value: "Sunday",
					},
					{
						text: {
							type: "plain_text",
							text: "Monday",
							emoji: false,
						},
						value: "Monday",
					},
					{
						text: {
							type: "plain_text",
							text: "Tuesday",
							emoji: false,
						},
						value: "Tuesday",
					},
					{
						text: {
							type: "plain_text",
							text: "Wednesday",
							emoji: false,
						},
						value: "Wednesday",
					},
					{
						text: {
							type: "plain_text",
							text: "Thursday",
							emoji: false,
						},
						value: "Thursday",
					},
					{
						text: {
							type: "plain_text",
							text: "Friday",
							emoji: false,
						},
						value: "Friday",
					},
					{
						text: {
							type: "plain_text",
							text: "Saturday",
							emoji: false,
						},
						value: "Saturday",
					},
				],
			},
		},
	],
};

export const favoriteHobbies = {
	blocks: [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "What are your favorite hobbies",
			},
		},
		{
			type: "divider",
		},
		{
			type: "actions",
      block_id: 'favouriteHobby',
			elements: [
				{
					type: "static_select",
					placeholder: {
						type: "plain_text",
						text: "Select an item",
						emoji: true,
					},
					options: [
						{
							text: {
								type: "plain_text",
								text: "Football",
								emoji: true,
							},
							value: "Football",
						},
						{
							text: {
								type: "plain_text",
								text: "Music",
								emoji: true,
							},
							value: "Music",
						},
						{
							text: {
								type: "plain_text",
								text: "Sleep",
								emoji: true,
							},
							value: "Sleep",
						},
						{
							text: {
								type: "plain_text",
								text: "Movies",
								emoji: true,
							},
							value: "Movies",
						},
						{
							text: {
								type: "plain_text",
								text: "Basketball",
								emoji: true,
							},
							value: "Basketball",
						},
					],
					action_id: "favouriteHobby",
				},
			],
		},
	],
};

export const thankYou = {
	blocks: [
		{
			type: "section",
      block_id: 'thank_you',
			text: {
				type: "plain_text",
				text: "Thank you.",
				emoji: false,
			},
		},
	],
};