# My Inbox App

A application built with Java Spring Boot.

## Start Backend

cd backend
./mvn spring-boot:run

Backend runs on `http://localhost:8080`

## API Endpoints

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/api/messages`      | List all messages  |
| GET    | `/api/messages/{id}` | Get single message |
| POST   | `/api/messages`      | Create message     |
| DELETE | `/api/messages/{id}` | Delete message     |

## Tech Stack

**Backend:**
-Java 17
-Spring Boot 3.2
-H2 Database
-Maven
