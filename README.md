<div align="center">
  <img src="https://i.ibb.co/WBw2qjP/logo.png" alt="Logo" height="125" />
</div>

<h1 align="center">Anty-Bullying Web Service API</h1>

<div align="center">

![Contributors](https://img.shields.io/badge/express-v4.18.2-blue.svg?logo=express)
![MongoDB](https://img.shields.io/badge/mongodb-v5.9.0-blue.svg?logo=mongodb)
![JWT](https://img.shields.io/badge/jwt-v9.0.2-blue.svg?logo=jsonwebtokens)

</div>

The Anty-Bullying RESTful API provides functionality that allows students to report incidents of bullying to teachers. This documentation serves as a guide for developers who want to integrate the AntiBullying API into their applications.

## Table of Contents

- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
  - [Local Development](#local-development)
  - [Docker Container](#docker-container)
- [Seed data](#seed-data)

## Project Structure

```
src\
 |--controllers\    # Route controllers (controller layer)
 |--mappers\        # Data mapping
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
```

## API Endpoints

For detailed information on the available API endpoints, please refer to the [Postman documentation](https://documenter.getpostman.com/view/30550520/2s9YRB2Bda).

## Prerequisites

Before you can run the AntiBullying REST API, you need to have the following prerequisites installed on your system:

- **Node.js:** Ensure you have Node.js installed. You can download it from the official website.
- **MongoDB:** You should have a MongoDB instance running. You can install MongoDB locally or use a cloud-based MongoDB service like MongoDB Atlas.

## How to Run

### Local Development

1. Clone the Repository:

   ```
   git clone https://github.com/4ken/CPI-FS-SDG-4-A_BE.git
   ```

2. Navigate to the project directory:

   ```
   cd CPI-FS-SDG-4-A_BE
   ```

3. Install Dependencies:

   ```
   npm install
   ```

4. Set up the environment variables:

   ```
   cp .env.example .env
   ```

   Then, open the `.env` file and fill in the values for the environment variables according to your setup.

5. Start the server:

   ```
   npm run dev
   ```

### Docker Container

1. Build the Docker image for the API:

   ```
   docker build \
   --build-arg DB_URI=<put_your_mongodb_connection_string_here> \
   --build-arg JWT_SECRET=<put_your_jwt_secret_key_here> \
   --tag antybullying-api .
   ```

2. Run the Docker container using the image created in the previous step:

   ```
   docker run -d -p 8080:8080 antybullying-api
   ```

## Seed data

To seed initial data into your MongoDB database, follow these steps:

1. Open the `seed/seed.js` file and set the [`dbURI`](./seed/seed.js#L10) variable to your MongoDB connection string.

2. Run the following command:

   ```
   node seed/seed.js
   ```

This command will populate your MongoDB database with initial user information data.
