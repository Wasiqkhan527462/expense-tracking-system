# Expense Tracking System

This is an Expense Tracking System developed using the **MERN** stack (MongoDB, Express.js, React, Node.js). The application allows users to sign up, log in, and manage their income and expenses, providing an overview of their financial status on a user-friendly dashboard.

## Features

- User authentication (signup, login, and logout)
- User dashboard displaying an overview of income and expenses
- Ability to add, edit, and delete income records
- Ability to add, edit, and delete expense records
- Visual representation of financial data with charts

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Getting Started

To run this project locally, follow the steps below:

### Prerequisites

- Node.js
- MongoDB

## Screen Shots

## Login
![Login](https://github.com/Wasiqkhan527462/expense-tracking-system/blob/0466329313872bcca653802580c96768edee3be7/Login.png)

## Dashboard
![Dashboard](https://github.com/Wasiqkhan527462/expense-tracking-system/blob/0466329313872bcca653802580c96768edee3be7/Dashboard.png)

## Add Income & Manage Income
![Add Income](https://github.com/Wasiqkhan527462/expense-tracking-system/blob/0466329313872bcca653802580c96768edee3be7/Income.png)

## Add Expense & Manage Expense
![Add Expense](https://github.com/Wasiqkhan527462/expense-tracking-system/blob/0466329313872bcca653802580c96768edee3be7/Expense.png)

### Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/expense-tracking-system.git
   cd expense-tracking-system/server
   ```

2. Create a `.env` file in the root of the server directory and add the following environment variables:
   ```plaintext
   MONGO_URL=<your_mongo_connection_string>
   PORT=<your_port>
   JWT_SECRET=<your_jwt_secret>
   ```

3. Install server dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```

2. Create a `.env` file in the root of the client directory and add the following environment variable:
   ```plaintext
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Install frontend dependencies:
   ```bash
   npm install
   ```

4. Start the frontend:
   ```bash
   npm start
   ```

## Usage

- Navigate to [http://localhost:3000](http://localhost:3000) to access the Expense Tracking System.
- Users can sign up to create an account and log in to manage their income and expenses.
- The dashboard provides an overview of financial data, allowing users to add or manage their income and expenses easily.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bugs you find.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
