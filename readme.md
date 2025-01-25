# Prestige Wheels, a Car Store Management App, Backend with Express and TypeScript

This project is a Car Store management Application API built using **Express**, **TypeScript**, and **MongoDB** with **Mongoose**. The application allows CRUD operations for managing cars and orders, provides inventory management, and calculates revenue using MongoDB aggregation.

## Features

- **Authenticatin**: Role based Auth, JWT, Access Token, Refresh Token, Change Password.
- **User Management**: Create, read, update, delete, and search for user.
- **Car Management**: Create, read, update, delete, and search for cars.
- **Order Management**: Place orders and automatically manage car inventory.
- **Revenue Calculation**: Calculate total revenue using MongoDB aggregation.
- **Data Validation**: Ensure data integrity with Mongoose schema validations.
- **Error Handling**: Generic error response for validation and server errors.

---

## Project Structure

````plaintext
src/
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.route.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.model.ts
│   │   ├── users/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.route.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.model.ts
│   │   ├── car/
│   │   │   ├── car.controller.ts
│   │   │   ├── car.route.ts
│   │   │   ├── car.service.ts
│   │   │   ├── car.model.ts
│   │   ├── order/
│   │       ├── order.controller.ts
│   │       ├── order.route.ts
│   │       ├── order.service.ts
│   │       ├── order.model.ts
├── server.ts
├── app.ts


## Roadmap for Running the App on Another PC

Follow these steps to run the project on a new machine.

### 1. Clone the Repository

Start by cloning the repository to the new machine:

```bash
git clone https://github.com/trrabby/prestige-wheels-a4-l2-server.git
cd prestige-wheels-a4-l2-server
npm i
````
