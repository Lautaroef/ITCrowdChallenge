# ITCrowd Technical Test

This readme file explains how to run the project and how it works.
**The Live project deployed in Vercel won't work as expected as the backend is not deployed. You must run the project locally to see the full functionality.**

## Installation

1. Clone the project repository from Github.
2. Navigate to the project directory in your terminal.

## Frontend Setup

1. Navigate to the client directory by running the following command: `cd client`

2. Install the required dependencies by running the following command: `npm i`

3. Update the `.env` file in the root directory of the project and set the necessary environment variables.

4. Start the frontend server by running the following command: `npm start`

## Backend Setup

1.  Navigate to the server directory by running the following command: `cd server` and run `npm i`

2.  Push the database by running the following command: `npx prisma db push`

3.  Feed the database with initial data by running the following command: `npm run feed:data`

4.  Start the backend server by running the following command: `npm run start`

You can now access the project by visiting `http://localhost:3000` in your browser.

## Frontend Working

1. The frontend is a **TypeScript Next.js application** that interacts with the backend API endpoints written in **Node.js**.
2. The primary features of the website include displaying games on the homepage and allowing users to add games to their favorites list.
3. **Local storage** is used to save user-selected games as favorites. When a user clicks the "Add to Favorites" button, the game is saved to their device's local storage. This action also updates the setFavorites() hook, allowing the homepage to display the updated list of favorites. The favorites are not saved in a database to avoid the need for adding authentication features.
4. An environment variable called name `process.env.NEXT_APP_API_URL` is used to call backend api using the axios.
5. **Cypress** is used for frontend testing. Run `npm run cypress` to initiate the tests, which will open a window where you can select components, choose a browser, and pick a test to run.

## Backend Working

1. **Prisma** is used alongside **PostgreSQL** for the backend database. To pre-populate the database, execute `npm run feed:data` after following the steps in the backend setup section.
2. **Zod** library is used to validate the input coming from the client and if OK then create the game in the database.
3. **Jest** is utilized for backend **API testing**. Use `npm run test` to execute the tests.
4. An environment variable called name `process.env.ORIGIN` is used to setup cors with the frontend.
5. The backend offers **Swagger** documentation for all API endpoints, accessible at the "/api-docs" endpoint.
