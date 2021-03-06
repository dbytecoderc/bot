# seren bot

## Overview

The **seren bot** app is a service is a slack bot questioner service that records answers added by users in the slack app.

## Technology Stack

- Nodejs
- Typescript
- Redis
- Mongodb

## Libraries used

You can get the details of the libraries used in the package.json file in the root directory of this project

### Setting Up

Clone the repo and cd into it: `git clone https://github.com/dbytecoderc/bot.git`

set the environment variables using the sample guide in the env.example file

Install dependencies using the command: `yarn install`

Run the application with the command: `yarn start:dev`

Run tests using `yarn test`

### testing in slack
Join the slack channel using this link [Slack](https://join.slack.com/t/seren-global/shared_invite/zt-n9pg8z41-VSK~j01os0vD1S11JqdlAg)

Use the @seren command to invoke the bot

### Testing

Fetch data from the application using these endpoints

> - GET `http://localhost:8080/api/v1/users`
> - GET `http://localhost:8080/api/v1/user-responses`
> - GET `http://localhost:8080/api/v1/user/:userId/user-responses`

Fetch data from the staging environment using these endpoints

> - GET `https://hidden-reaches-80062.herokuapp.com/api/v1/users`
> - GET `https://hidden-reaches-80062.herokuapp.com/api/v1/user-responses`
> - GET `https://hidden-reaches-80062.herokuapp.com/api/v1/user/:userId/user-responses`

NB: You might get multiple messages when you ping the server for the first time after invoking the bot, you should ignore it.
