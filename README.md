# AntiBullying REST API Documentation

This repository contains documentation for the AntiBullying RESTful API, a platform that allows students to report bullying incidents to teachers.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
- [Seed data](#seed-data)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Introduction

The AntiBullying RESTful API provides functionality that allows students to report incidents of bullying to teachers. This documentation serves as a guide for developers who want to integrate the AntiBullying API into their applications.

## Prerequisites

Prerequisites
Before you can run the AntiBullying REST API, you need to have the following prerequisites installed on your system:

- **Node.js:** Ensure you have Node.js installed. You can download it from the official website.
- **MongoDB:** You should have a MongoDB instance running. You can install MongoDB locally or use a cloud-based MongoDB service like MongoDB Atlas.

## How to Run

Now, follow the steps below to run the API on your local environment:

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

## Seed data

To seed initial data into your MongoDB database, follow these steps:

1. Open the `seed/seed.js` file and set the [`dbURI`](./seed/seed.js#L8) variable to your MongoDB connection string.

2. Run the following command:

   ```
   node seed/seed.js
   ```

   This command will populate your MongoDB database with initial user information data.

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
