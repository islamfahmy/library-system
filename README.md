# Library System

## Requirements
- Node.js v18
- PostgreSQL Database

## Getting Started

### Prerequisites
1. Install Node.js v18 on your machine.
2. Set up a PostgreSQL database.

### Setup Instructions
1. Create the necessary databases for the project.
2. Create a `.env` file in the project root and add the following variable:

   ```env
   DATABASE_URL="postgresql://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE_NAME}?schema=public"
   ```
Replace ${USERNAME}, ${PASSWORD}, ${HOST}, ${PORT}, and ${DATABASE_NAME} with your PostgreSQL database credentials.

## API Documentation

To explore the API documentation, you can use Swagger UI. Follow the steps below:

1. Make sure your project is running.

2. Open your web browser and navigate to [http://localhost:8000/api-docs/](http://localhost:8000/api-docs/).

3. Swagger UI will be displayed, allowing you to interact with and explore the available API endpoints.
