# TodoGPT

This project is a web application based on NodeJS for the back-end and on Vue3 for the front-end. This is a to do list application which the particularity that the user can generate a to do list from a single sentence thanks Artificial Intelligence and OpenIA's models.

## Prerequisites

- NodeJS
- MySQL Database

## Installation

### Database Setup
1. Execute the `sql_init.sql` script located at the root of the repository in your MySQL server to create the required tables.

### Server Setup
1. Navigate to the `todo_gpt/server/app/config/db.config.js` file and replace the `USER` and `PASSWORD` with your MySQL authentication credentials.

2. Go to `todo_gpt/server/app/controllers/task.controller.js` and replace the `API_KEY` on line 30 with your OpenAI Developer API Key.

### Client Launch
1. Open a terminal and navigate to the `client` directory:
   ```
   cd ./client/
   ```
2. Run the following command to start the client:
   ```
   npm run serve
   ```

### Server Launch
1. Open another terminal and navigate to the `server` directory:
   ```
   cd ./server/
   ```
2. Run the following command to start the server:
   ```
   npm start
   ```

Now you should have both the client and server running. You can access the web application through your browser `http://localhost:8081` (client) `http://localhost:8080` (server) and start using the project.

## Usage
Do not use it on production since the communication between client and server doesn't use user's authentification to allow him modify only his data. This is feature will come in the next few days.

## License
This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) - see the [LICENSE.md](LICENSE.md) file for details.
