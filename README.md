# AntiBullying REST API Documentation

This repository contains documentation for the AntiBullying RESTful API, a platform that allows students to report bullying incidents to teachers.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
- [Seed data](#seed-data)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [API Requests and Responses](#api-requests-and-responses)

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
   npm run seed
   ```

   This command will populate your MongoDB database with initial user information data, including teacher and students. You can customize this data as needed.

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

| Method | Endpoint                                                  | Description                                      |
| ------ | --------------------------------------------------------- | ------------------------------------------------ |
| POST   | [`/api/auth/login`](#post-apiauthlogin)                   | Log in teacher or students                       |
| POST   | [`/api/auth/reset-password`](#post-apiauthreset-password) | Request a password reset for teacher or students |
| GET    | [`/api/teacher/profile`](#get-apiteacherprofile)          | Retrieve teacher profile information             |
| PATCH  | [`/api/teacher/profile`](#patch-apiteacherprofile)        | Update teacher profile information               |
| GET    | [`/api/student`](#get-apistudent)                         | Retrieve list of students                        |
| GET    | [`/api/student/:nomorInduk`](#get-apistudentnomorinduk)   | Retrieve student information                     |
| GET    | [`/api/student/profile`](#get-apistudentprofile)          | Retrieve student profile information             |
| PATCH  | [`/api/student/profile`](#patch-apistudentprofile)        | Update student profile information               |

## API Requests and Responses

### **POST /api/auth/login**

Authenticate and log in teacher or students

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

  ```
  {
    nomorInduk: string,
    kataSandi: string
  }
  ```

- **Success Response:**
- **Code:** 200  
  **Content:**

  ```
  {
    pesan: string
    token: string
  }
  ```

* **Error Response:**

  - **Code:** 400  
    **Content:** `{ error : "Nomor induk harus diisi" }`

    OR

  - **Code:** 401  
    **Content:** `{ error : "Nomor induk atau kata sandi salah" }`

### **POST /api/auth/reset-password**

Request a password reset for teacher or students

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<Token>`
- **Data Params**

  ```
  {
    kataSandiLama: string,
    kataSandiBaru: string,
    konfirmasiKataSandi: string
  }
  ```

- **Success Response:**
- **Code:** 200  
  **Content:** `{ pesan: string }`

* **Error Response:**

  - **Code:** 400  
    **Content:** `{ error : "Konfirmasi kata sandi tidak cocok dengan kata sandi baru" }`

    OR

  - **Code:** 401  
    **Content:** `{ error : "Anda tidak memiliki akses ke sumber daya ini" }`

### **GET /api/teacher/profile**

Retrieve teacher profile information

- **URL Params**  
  None
- **Headers**  
  Authorization: Bearer `<Token>`
- **Data Params**  
  None

- **Success Response:**
- **Code:** 200  
  **Content:**

  ```
  {
    data: {
      nomorInduk: string,
      nama: string,
      tempatTanggalLahir: string,
      alamat: string
    }
  }
  ```

### **PATCH /api/teacher/profile**

Retrieve teacher profile information

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<Token>`
- **Data Params**

  ```
  {
    nomorInduk: string,
    nama: string,
    tempatTanggalLahir: string,
    alamat: string
  }
  ```

- **Success Response:**
- **Code:** 200  
  **Content:** `{ pesan: string }`

* **Error Response:**

  - **Code:** 400  
    **Content:** `{ error: "Nomor induk harus diisi" }`

    OR

  - **Code:** 401  
    **Content:** `{ error : "Anda tidak memiliki akses ke sumber daya ini" }`

### **GET /api/student**

Retrieve list of students

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<Token>`
- **Data Params**  
  None
- **Query Params**  
  search: string|optional

- **Success Response:**
- **Code:** 200  
  **Content:**

  ```
  {
    data: [
      {
        nomorInduk: string,
        nama: string,
        tempatTanggalLahir: string,
        alamat: string,
        orangTua: {
          namaAyah: string,
          namaIbu: string,
        }
      }
    ]
  }
  ```

### **GET /api/student/:nomorInduk**

Retrieve student information

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<Token>`
- **Data Params**  
  nomorInduk: numeric

- **Success Response:**
- **Code:** 200  
  **Content:**

  ```
  {
    data: {
      nomorInduk: string,
      nama: string,
      tempatTanggalLahir: string,
      alamat: string,
      orangTua: {
        namaAyah: string,
        namaIbu: string,
      }
    }
  }
  ```

### **GET /api/student/profile**

Retrieve student profile information

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<Token>`
- **Data Params**  
  None

- **Success Response:**
- **Code:** 200  
  **Content:**

  ```
  {
    data: {
      nomorInduk: string,
      nama: string,
      tempatTanggalLahir: string,
      alamat: string,
      orangTua: {
        namaAyah: string,
        namaIbu: string,
      }
    }
  }
  ```

### **PATCH /api/student/profile**

Retrieve student profile information

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<Token>`
- **Request Body**

  ```
  {
    nomorInduk: string,
    nama: string,
    tempatTanggalLahir: string,
    alamat: string,
    orangTua: {
      namaAyah: string|optional,
      namaIbu: string|optional,
    }
  }
  ```

- **Success Response:**
- **Code:** 200  
  **Content:** `{ pesan: string }`

* **Error Response:**

  - **Code:** 400  
    **Content:** `{ error: "Nomor induk harus diisi" }`

    OR

  - **Code:** 401  
    **Content:** `{ error : "Anda tidak memiliki akses ke sumber daya ini" }`
