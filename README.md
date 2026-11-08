# Full Stack Orders Management App

A full-stack order management application built with **Next.js and Express.js**. It provides an admin dashboard for managing orders, tracking order progress, monitoring payments, and viewing customer and transaction details.

## Features

### Order Management
- View all orders in a responsive data table.
- Search orders by order ID or customer information.
- Filter orders by status and date.
- Paginated order listing.
- View detailed order information, including purchased items and totals.

### Order Tracking
- Track order progress through a visual timeline.
- Update order status:
  - Pending
  - Processing
  - Shipped
  - Completed
  - Cancelled
- View order status history and progress.

### Payment Management
- View payment method and payment information.
- Manage payment statuses:
  - Unpaid
  - Paid
  - Refunded
- Display payment status separately from order status.

### User Interface
- Modern and clean admin dashboard.
- Fully responsive design.
- Light and dark mode support.
- Toast notifications for user actions.
- Reusable UI components.

## Tech Stack

### Frontend (`/frontend`)
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Sonner (Toast Notifications)

### Backend (`/express`)
- Node.js
- Express.js
- Sequelize
- REST API
- Redis Cache
- PostgreSQL
## Project Structure

```text
.
├── express/              # Express.js backend
│   ├── src/
│   ├── .env.example
│   └── package.json
│
├── frontend/             # Next.js frontend
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── package.json
│
├
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) 18 or later
- npm
- Git
- A configured database (if required by your backend)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git

cd YOUR-REPO
```

### 2. Set Up the Backend

```bash
cd express

npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure your backend environment variables, then start the server:

```bash
npm start
```

### 3. Set Up the Frontend

Open a second terminal:

```bash
cd frontend

npm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

Configure the frontend API URL, then start the development server:

```bash
npm run dev
```

### 4. Open the Application

Visit:

```text
http://localhost:3000
```

Make sure your Express backend is running before using the application.

## Environment Variables

Create environment files using the provided examples.

### Backend (`express/.env`)

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `DATABASE_URL` | Database connection string |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the Express REST API |

Update these variables according to your actual project configuration.

**Security:** Never commit real API keys, database credentials, or passwords to Git.

## Available Scripts

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

### Backend

| Command | Description |
|---|---|
| `npm start` | Start Express API server |

Check each package's `package.json` for the actual available scripts.

## Order Status Workflow

| Status | Description |
|---|---|
| Pending | Order received and waiting for processing |
| Processing | Items are being prepared and packed |
| Shipped | Order has been dispatched to the customer |
| Completed | Order has been successfully delivered |
| Cancelled | Order has been cancelled |

## Payment Status

| Status | Description |
|---|---|
| Unpaid | Payment has not been received |
| Paid | Payment has been confirmed |
| Refunded | Payment has been refunded |

Order status and payment status are managed independently.

## Contributing

Contributions are welcome!

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

2. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

3. Push your branch:

   ```bash
   git push origin feature/your-feature
   ```

4. Open a Pull Request.

## License

This project is licensed under the MIT License.

Add a `LICENSE` file to the repository if you choose MIT.
