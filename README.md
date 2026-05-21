# Football Manager Web Game

## Overview
This project is a web-based football manager game developed using TypeScript/JavaScript and Node.js. It allows users to manage a football team, simulate matches, and track player statistics.

## Project Structure
The project is organized into the following main directories:

- **server**: Contains the backend application built with Node.js and Express.
  - **src**: Source files for the server application.
    - **controllers**: Contains controllers for handling requests.
    - **models**: Contains data models for players and teams.
    - **services**: Contains business logic, such as match simulation.
    - **routes**: Defines API routes for the application.
  - **package.json**: Lists server dependencies and scripts.
  - **tsconfig.json**: TypeScript configuration for the server.

- **client**: Contains the frontend application built with React.
  - **src**: Source files for the client application.
    - **components**: Contains reusable React components.
    - **pages**: Contains page components for different views.
    - **styles**: Contains CSS styles for the application.
  - **package.json**: Lists client dependencies and scripts.
  - **tsconfig.json**: TypeScript configuration for the client.

- **shared**: Contains shared types and interfaces used across both server and client.

- **scripts**: Contains scripts for database seeding and other utilities.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd football-manager
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

### Running the Application
1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd ../client
   npm start
   ```

### Usage
- Access the client application in your web browser at `http://localhost:3000`.
- Use the interface to manage your football team, view player statistics, and simulate matches.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.