# ITCrowd Technical Test

This readme file explains how to run the project and how it works.

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

1. The frontend is a **TypeScript Next.js application** deployed in **Vercel** that interacts with the backend API endpoints written in **Node.js**.
2. The website's main features involve showcasing games on the homepage and enabling users to add games to their favorites list.
3. **Local storage** is employed for saving user-selected games as favorites. When users click "Add to Favorites," the game is stored on their device's local storage. This eliminates the need for database storage and authentication features for storing the user's favorites.
4. The environment variable `process.env.NEXT_APP_API_URL` is utilized for making backend API calls using Axios.
5. For testing, the **Cypress** library was used. You can run `npm run cypress` to initiate the tests, which will open a window where you can select components, choose a browser, and pick a test to run.

## Backend Working
1. The backend is entirely developed in **Node.js** with **TypeScript**.
2. The data is stored in a **PostgreSQL** database, deployed using **Supabase** services, which offers a free hosted SQL database. To pre-populate the database, run npm run feed:data after following the backend setup instructions.
3. For the ORM I made use of **Prisma**. Which allows in a couple of steps to add an extra layer of security before uploading new objects to the database, plus it offers easier ways to interact with the db making us the developer to provide more value faster. 
4. For validating the data coming from the front-end, I used the **Zod** library.
5. **Jest** is utilized for backend **API testing**. Use `npm run test` to execute the tests.
6. The environment variable process.env.ORIGIN is employed to configure CORS with the frontend.
7. The backend provides Swagger documentation for all API endpoints, available at the "/api-docs" endpoint.
