# Meatika (មាទិកា)

This repository contains the source code for a web application that facilitates article creation and management. It's designed with a client-server architecture, leveraging React for the frontend (`client`) and Node.js with Express for the backend (`server`).

## Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/maokimkorng/meatika.git
   ```

2. **Install Dependencies:**

   Navigate to the project root directory and install dependencies for both the client and server sides:

   ```bash
   cd articleApp
   cd client && npm install
   cd ../server && npm install
   ```

3. **Configure Server Environment Variables (Required):**

   - Create a file named `.env` in the `server` directory.
   - Add the following environment variables, replacing placeholders with your actual values:

     ```
     PORT=5000  # Port on which the server listens (default: 5000)
     DB_CONNECT_STR=<your-mongodb-connection-string>
     JWT_SECRET_KEY=<your-secret-key>
     ALLOWED_ORIGINS=http://localhost:3000
     ```

## Running the Application

1. **Start the Server:**

   ```bash
   cd server
   npm start
   ```

   This will start the Node.js server, typically listening on port 5000 (as specified in the `.env` file).

2. **Run the Client:**

   ```bash
   cd ../client
   npm start
   ```

   This will launch the React development server, usually accessible at `http://localhost:3000` by default (depending on your configuration).