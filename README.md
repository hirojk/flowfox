# Flowfox App (0.1.1)

Flowfox is a project management application designed to organize and manage projects in a flexible and customizable way. It focuses on reusable components and configurable layouts, allowing each project to be tailored to specific needs.

Currently, the app includes a **Board** component, inspired by a Trello-style Kanban board, for organizing tasks. Additional components and features are planned for future releases.

⚠️ The application is currently optimized for desktop and tablet devices.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

## Tech Stack

This project is structured as a monorepo using [Turborepo](https://turbo.build/) with [pnpm](https://pnpm.io/) workspaces.

### Frontend

- **Framework:** Vue.js 3 (TypeScript)
- **State Management:** Pinia
- **UI Framework:** Quasar
- **HTTP Client:** Axios
- **Rendering:** Single Page Application (SPA)
- **Build Tool:** Vite
- **Code Quality:** ESLint, Prettier, Stylelint
- **Tests:** Not implemented yet

### Backend

- **Framework:** Express.js (TypeScript)
- **Database:** MongoDB
- **ODM:** Mongoose
- **Tests:** Not implemented yet

## Getting Started

Clone the repository and install dependencies:

```sh
pnpm install
```

Start the development server:

```sh
pnpm dev
```

The application should now be running locally.

⚠️ For access to a test account and login credentials, please contact the author.

## Project Structure

The Project files are structured like this:

```sh
├── apps
│   ├── backend                         # Backend (Node.js / API layer)
│   │   ├── config                      # Configuration files (environment, database, etc.)
│   │   ├── controllers                 # Request handlers and business logic
│   │   ├── middleware                  # Express middleware (auth, logging, etc.)
│   │   ├── models                      # Database models / schemas
│   │   ├── routes                      # API route definitions
│   │   ├── types                       # TypeScript type definitions
│   │   ├── utils                       # Utility/helper functions
│   │   │
│   │   └── server.ts                   # Application entry point
│   │
│   └── frontend                        # Frontend (Vue.js application)
│       ├── public                      # Static assets
│       ├── src                         # Main source code
│       │   ├── components              # Reusable UI components
│       │   ├── composables             # Vue composables (logic reuse)
│       │   ├── constants               # Frontend constants
│       │   ├── layouts                 # Layout components
│       │   ├── pages                   # Application pages/views
│       │   ├── router                  # Routing configuration
│       │   ├── services                # API calls and external services
│       │   ├── stores                  # State management (e.g. Pinia)
│       │   ├── styles                  # Global and component styles
│       │   ├── types                   # TypeScript type definitions
│       │   ├── App.vue                 # Root Vue component
│       │   ├── global.components.ts    # Global component registration
│       │   └── main.ts                 # Frontend entry point
│       │
│       └── index.html                  # Main HTML file
│
├── packages
│   └── shared                          # Shared code between frontend & backend
│       ├── constants                   # Shared constants
│       ├── schemas                     # Shared validation schemas
│       ├── utils                       # Shared utility functions
│       ├── types                       # Shared TypeScript types
│       └── index.ts                    # Shared module entry point
│
├── package.json                        # Project dependencies and scripts
└── turbo.json                          # Turborepo configuration
```

## Deployment

The application is currently deployed using [Vercel](https://vercel.com), a simple and convenient deployment and hosting platform. This setup is temporary and may change in the future as the project grows or requires a different deployment solution.

Each merge into the `main` or `dev` branch triggers an automatic deployment.

- **Production (`main`):** https://flowfox.vercel.app/
- **Staging (`dev`):** https://stagingflowfox.vercel.app/

Once a deployment is successful, the application is live and can be accessed as a web app.

## Issues and future Changes

The following improvements are planned for the upcoming 0.2.0 release:

- Improve the UX/UI with a more refined visual design
- Add tests for both frontend and backend to increase stability

🙏 Feedback is always welcome. If you encounter any critical issues or bugs, please report them so they can be resolved promptly.
