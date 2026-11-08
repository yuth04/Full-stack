# Full Stack Orders App

An order management app with a Next.js frontend and an Express backend. Admins can browse orders, filter and search them, view order details, and update order and payment status.

## Features

- Orders list with status tabs, search, date filter, and pagination
- Order detail page with items, timeline, customer and payment information
- Order tracking timeline: Pending → Processing → Shipped → Completed, plus Cancel
- Payment status updates: Unpaid, Paid, Refunded
- Responsive layout with light and dark mode support

## Tech stack

**Frontend** (`/frontend`)
- Next.js (App Router) and React
- TypeScript
- Tailwind CSS and shadcn/ui
- lucide-react icons and sonner toasts

**Backend** (`/express`)
- Node.js and Express

## Project structure

```
.
├── express/       # REST API
├── frontend/      # Next.js app
├── Shemas.md      # Data schemas
└── README.md
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or later
- npm (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

### 2. Set up the backend

```bash
cd express
npm install
cp .env.example .env
npm start
```

### 3. Set up the frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Copy each `.env.example` file and fill in your own values. Never commit real keys or passwords.

**`express/.env`**

| Variable | Description |
| --- | --- |
| `PORT` | Port the API runs on |
| `DATABASE_URL` | Database connection string |

**`frontend/.env.local`**

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the Express API |

Update these tables to match the variables your project actually uses.

## Scripts

**Frontend**

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run lint` | Check code with ESLint |

**Backend**

| Command | What it does |
| --- | --- |
| `npm start` | Start the API server |

## Order statuses

| Status | Meaning |
| --- | --- |
| Pending | Order received, waiting to be processed |
| Processing | Items are being prepared and packed |
| Shipped | On the way to the customer |
| Completed | Delivered and fulfilled |
| Cancelled | Order stopped |

## Contributing

1. Create a branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m "Add your feature"`
3. Push the branch: `git push origin feature/your-feature`
4. Open a pull request

## License

Add your license here, for example MIT.
