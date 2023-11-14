<div align="center">
  <img src="https://i.ibb.co/WBw2qjP/logo.png" alt="Logo" height="125" />
</div>

<h1 align="center">Anty-Bullying Web Service API</h1>

The Anty-Bullying RESTful API provides functionality that allows students to report incidents of bullying to teachers. This documentation serves as a guide for developers who want to integrate the Anty-Bullying API into their applications.

## Table of Contents

- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
  - [Action Schema](#action-schema)
  - [Report Schema](#report-schema)
  - [Class Schema](#class-schema)
  - [User Schema](#user-schema)
  - [Student Schema (Inherits from User Schema)](#student-schema-inherits-from-user-schema)
  - [Teacher Schema (Inherits from User Schema)](#teacher-schema-inherits-from-user-schema)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
  - [Local Development](#local-development)
  - [Docker Container](#docker-container)
- [Seed data](#seed-data)
- [Available User Accounts](#available-user-accounts)

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

## Database Schema

### Action Schema

The `Action` schema represents the actions taken by the teacher in response to a student behavior. It captures details about the student and the type of action performed.

- **student (String):** Represents the identification number of the student for whom the action is recorded.
- **actionType (String, Enum):** Specifies the type of action taken.
- **timestamps (Date):** Automatically generated timestamps indicating when the action record was created or updated.

### Report Schema

The `Report` schema is designed to document incidents, providing a comprehensive overview of reported events, including details about the perpetrator, reporter, incident date, location, description, and the current status of the report.

- **perpetrator (String):** Represents the identification number of the student identified as the perpetrator in the incident.
- **reporter (String):** Captures the identification number of the student who reported the incident.
- **incidentDate (Date):** Records the date and time when the incident occurred.
- **incidentLocation (String):** Specifies the location where the incident took place.
- **incidentDescription (Type):** Provides a detailed description of the incident.
- **status (String, Enum):** Indicates the current status of the report.
- **timestamps (Date):** Automatically generated timestamps indicating when the report was created or updated.

### Class Schema

The `Class` schema is designed to represent a class or group.

- **name (String):** Represents the name or identifier of the class.

### User Schema

The `User` schema represents user accounts within the system. It includes information about the user's personal details, authentication credentials, address, class, and role (either 'teacher' or 'student').

- **fullName (String):** The full name of the user.
- **placeDateOfBirth (String):** Specifies the user's place and date of birth.
- **salt (String):** A cryptographic salt used in password hashing for enhanced security.
- **password (String):** The hashed password of the user for authentication.
- **address (String):** The residential address of the user.
- **class (ObjectId):** This field holds the reference to the associated class through its ObjectId.
- **role (String, Enum):** Specifies the role of the user, which can be either 'teacher' or 'student'.

### Student Schema (Inherits from User Schema)

The `Student` schema extends the `User` schema, providing additional details specific to students. It includes a student identification number, as well as information about the student's parents.

- **studentIdentificationNumber (String):** Represents the student identification number.
- **parent.fatherName (String):** The full name of the student's father.
- **parent.motherName (String):** The full name of the student's mother.
- **parent.phone (String):** The contact number of one of the student's parents.
- **parent.email (String):** The email address of one of the student's parents.

### Teacher Schema (Inherits from User Schema)

The `Teacher` schema extends the `User` schema, adding specific fields related to teacher-specific information.

- **employeeIdentificationNumber (String):** A unique identification number assigned to the teacher.

## Prerequisites

Before you can run the AntiBullying REST API, you need to have the following prerequisites installed on your system:

- **Node.js:** Ensure you have Node.js installed. You can download it from the official website.
- **MongoDB:** You should have a MongoDB instance running. You can install MongoDB locally or use a cloud-based MongoDB service like MongoDB Atlas.
- **Docker (optional):** Depending on whether you plan to run the application in a containerized environment. You can install Docker by following the instructions on the official Docker website.

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
# Port number (default is 3000)
PORT=

# URI of the MongoDB
DB_URI=

# JWT secret key
JWT_SECRET=
# The number of seconds before the access token expires (default is 2 hours)
JWT_EXPIRATION=

# List of allowed origins, separated by commas (default is '*')
ALLOWED_ORIGINS=
```

## How to Run

### Local Development

1. **Clone the Repository:**

   ```
   git clone https://github.com/4ken/CPI-FS-SDG-4-A_BE.git
   ```

2. **Navigate to the project directory:**

   ```
   cd CPI-FS-SDG-4-A_BE
   ```

3. **Install Dependencies:**

   ```
   npm install
   ```

4. **Set up the environment variables:**

   ```
   cp .env.example .env
   ```

   Then, open the `.env` file and fill in the values for the environment variables according to your setup.

5. **Start the server:**

   ```
   npm run dev
   ```

### Docker Container

1. **Build the Docker Image for the API:**

   To successfully build the Docker image for the API, you need to provide specific build arguments, ensuring that the MongoDB connection string **`DB_URI`** and JWT secret key **`JWT_SECRET`** are appropriately set. Follow the example below to build the image:

   ```
   docker build \
   --build-arg DB_URI=<your_mongodb_connection_string> \
   --build-arg JWT_SECRET=<your_jwt_secret_key> \
   --tag antybullying-api .
   ```

   Replace `<your_mongodb_connection_string>` with your MongoDB connection string, and `<your_jwt_secret_key>` with your JWT secret key. These arguments are essential for the proper configuration of the API within the Docker container.

2. **Run the Docker Container:**

   After successfully building the Docker image, you can run the Docker container using the image created in the previous step. Execute the following command:

   ```
   docker run -d -p 8080:8080 antybullying-api
   ```

   This command starts the Docker container and opens port 8080 on your local machine.

## Seed data

To seed initial data into your MongoDB database, follow these steps:

1. Open the [`seed/seed.js`](./seed/seed.js) file, and set the [`dbURI`](./seed/seed.js#L10) variable to your MongoDB connection string.

2. Run the following command:

   ```
   node seed/seed.js
   ```

   This command will populate your database with the initial data contained in [`seed/data/`](./seed//data/) folder.

## Available User Accounts

To access the application, you can utilize the following user accounts pre-seeded in the database:

| Name                        | Role    | Identification Number | Password             | Class |
| --------------------------- | ------- | --------------------- | -------------------- | ----- |
| Budi Wijaya, S.Pd.          | Teacher | `197805051234567002`  | `197805051234567002` | A     |
| Ida Ayu Dian Puspani, M.Pd. | Teacher | `192198376502193007`  | `192198376502193007` | B     |
| Agus Setiawan               | Student | `1234567890`          | `1234567890`         | A     |
| Rina Fitriani               | Student | `0987654321`          | `0987654321`         | A     |
| Budi Prasetyo               | Student | `5432109876`          | `5432109876`         | A     |
| Dewi Susanti                | Student | `9876543210`          | `9876543210`         | A     |
| Rizal Fauzi                 | Student | `2345678901`          | `2345678901`         | A     |
| Siti Aisyah                 | Student | `6789012345`          | `6789012345`         | A     |
| Hadi Pramono                | Student | `3456789012`          | `3456789012`         | A     |
| Rita Wulandari              | Student | `7890123456`          | `7890123456`         | A     |
| Andi Susilo                 | Student | `4567890123`          | `4567890123`         | A     |
| Nina Permata                | Student | `8901234567`          | `8901234567`         | A     |
| Ahmad Farhan                | Student | `4598237619`          | `4598237619`         | B     |
| Dewi Lestari                | Student | `7182946315`          | `7182946315`         | B     |
| Rudi Cahyono                | Student | `2938471625`          | `2938471625`         | B     |
| Eka Putri                   | Student | `8615297340`          | `8615297340`         | B     |
| Surya Wijaya                | Student | `9258317462`          | `9258317462`         | B     |
| Dini Susanti                | Student | `6374859124`          | `6374859124`         | B     |
