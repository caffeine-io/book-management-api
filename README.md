---
# Book Management API

A simple backend for managing books with authentication via Auth0, using NestJS, SQLite, and GraphQL.
---

## 🚀 Technologies Used

- **NestJS**: Backend framework
- **TypeORM**: ORM for SQLite
- **Auth0**: Authentication & Authorization
- **GraphQL**: API endpoints
- **SQLite**: Database

---

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/caffeine-io/book-management-api.git

   cd book-management-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## 🛠 Setup

### 1. **Environment Variables**

- Copy the example env file:
  ```bash
  cp .env.example .env
  ```
- Update `.env` with your Auth0 credentials and settings:
  ```env
  AUTH0_DOMAIN=your-auth0-domain.auth0.com
  AUTH0_AUDIENCE=https://your-api-audience
  AUTH0_ISSUER_URL=https://your-auth0-domain.auth0.com/
  FRONTEND_URL=http://localhost:3000
  DATABASE_URL=./books.db
  PORT=3000
  ```

### 2. **Auth0 Setup**

- Create an Auth0 account and [create an API](https://manage.auth0.com/) with the following:
  - **API Name**: `Books API`
  - **Identifier (Audience)**: `https://your-api-audience` (use this for `AUTH0_AUDIENCE`)
- Create a [Client Application](https://manage.auth0.com/) for your frontend:
  - Add `http://localhost:3000` to **Allowed Callback URLs** and **Allowed Logout URLs**.

---

## 🏃 Run the App

1. **Start the server**:

   ```bash
   npm run start:dev
   ```

   The app will run on `http://localhost:3000`.

2. **Access the GraphQL Playground**:
   Open `http://localhost:3000/graphql` in your browser.

---

## 🪛 Testing the API

### 1. **Get an Auth0 Token**

- Use Auth0's to generate a JWT.

### 2. **Test Queries/Mutations**

#### Example: **Create a Book**

```graphql
mutation {
  createBook(
    createBookInput: { name: "1984", description: "A dystopian novel" }
  ) {
    id
    name
    description
  }
}
```

- Add the token to the Playground's headers:
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```

#### Example: **List All Books**

```graphql
query {
  books {
    id
    name
    description
  }
}
```

---
