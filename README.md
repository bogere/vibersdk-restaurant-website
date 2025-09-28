# Aetheria Eatery: A Modern Culinary Experience

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/bogere/vibersdk-restaurant-website)

Aetheria Eatery is a visually stunning, production-ready website for a modern restaurant, featuring a seamless online food ordering system. The application prioritizes a breathtaking user interface and an intuitive user experience, built on Cloudflare's edge network for unparalleled performance. The core of the application is a visually rich, interactive menu where users can browse high-quality images of dishes, filter by various criteria, and manage their orders through a non-intrusive cart drawer. The design is dark, elegant, and sophisticated, using a combination of professional typography, generous spacing, and subtle micro-interactions to create an immersive digital dining experience.

## ✨ Key Features

-   **Elegant Dark-Mode UI:** A sophisticated and visually rich interface designed for a premium user experience.
-   **Interactive Menu Grid:** A fully filterable and searchable menu with smooth animations and hover effects.
-   **Seamless Cart Drawer:** Add items to your cart, adjust quantities, and view your order without ever leaving the menu page.
-   **Responsive Perfection:** A flawless layout that adapts beautifully to desktops, tablets, and mobile devices.
-   **High-Performance Foundation:** Built on Cloudflare's edge network for lightning-fast load times and a snappy user experience.
-   **Client-Side State Management:** Fast and efficient state management using Zustand for a reactive and responsive UI.

## 🚀 Technology Stack

-   **Frontend:** React, Vite, TypeScript
-   **Styling:** Tailwind CSS, shadcn/ui
-   **State Management:** Zustand
-   **Animation:** Framer Motion
-   **Backend:** Hono on Cloudflare Workers
-   **Persistence:** Cloudflare Durable Objects

## 🏁 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/aetheria-eatery.git
    cd aetheria-eatery
    ```

2.  **Install dependencies:**
    This project uses `bun` for package management.
    ```bash
    bun install
    ```

### Running Locally

To start the development server, which includes both the Vite frontend and the Hono backend on Cloudflare Workers, run:

```bash
bun dev
```

The application will be available at `http://localhost:3000`.

## 🛠️ Development

The project is structured into three main directories:

-   `src/`: Contains the React frontend application, including pages, components, stores, and hooks.
-   `worker/`: Contains the Hono backend application that runs on Cloudflare Workers.
-   `shared/`: Contains TypeScript types and mock data shared between the frontend and backend.

### Frontend

-   **Pages:** Located in `src/pages`, with `HomePage.tsx` being the main entry point.
-   **Components:** Reusable UI components are in `src/components`. Core UI elements are built using `shadcn/ui`.
-   **State Management:** Global state for the cart and filters is managed by Zustand stores in `src/store`.

### Backend

-   **API Routes:** Backend logic and API endpoints are defined in `worker/user-routes.ts` using the Hono framework.
-   **Data Persistence:** Data models (Entities) and interaction with Cloudflare Durable Objects are defined in `worker/entities.ts`.

## ☁️ Deployment

This project is designed for seamless deployment to Cloudflare Pages.

1.  **Build the project:**
    This command bundles the frontend and worker for production.
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    This command deploys your application to the Cloudflare network using Wrangler.
    ```bash
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/bogere/vibersdk-restaurant-website)

## 🗺️ Project Roadmap

The project is being developed in three distinct phases:

-   **Phase 1: Visual Foundation & Interactive Frontend**
    -   Build the complete, visually stunning frontend experience using mock data.
    -   Implement the main page layout, header, footer, interactive menu grid, filter sidebar, and cart drawer.

-   **Phase 2: Backend Integration & Order Persistence**
    -   Replace mock data with live data from the Cloudflare Worker backend.
    -   Implement Hono API endpoints and Durable Objects for menu and order persistence.

-   **Phase 3: Checkout Flow & User Accounts**
    -   Implement a multi-step checkout process.
    -   Add user authentication to allow for order history and saved information.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.