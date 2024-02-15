### Vzy BackEnd Test

---

### Installation

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory of the project and add the following environment variables as shown in [sample.env](./sample.env)


4. Run the project:

   ```bash
   npm run build
   npm start
   ```

---

### Usage

#### Authentication Routes

- **Register a new user:**
  ```http
  POST /api/auth/register
  ```
  payload:
  ```json
  {
    "fullName": "John Doe",
    "email": "example.com",
    "password": "password"
  }
  ```

- **Login:**
  ```http
  POST /api/auth/login
  ```
  payload:
  ```json
  {
    "email": "example.com",
    "password": "password"
  }
  ```

#### User Routes

- **Edit User Profile:**
  ```http
  PUT /api/users/edit
  ```
  Update the user's full name.

  payload:
  ```json
  {
    "fullName": "John Doe"
  }
  ```

#### Stripe Payment Routes

- **Initiate Payment:**
  ```http
  POST /api/stripe/payment
  ```
  Initiate a payment for purchasing a T-shirt.

- **Success URL:**
  ```http
  GET /api/stripe/success
  ```
  URL to redirect to after successful payment.

- **Cancel URL:**
  ```http
  GET /api/stripe/cancel
  ```
  URL to redirect to if payment is cancelled.

---
