# Flowfox App (1.0.0)

This is a personal project built to organize and manage future projects in a flexible way. The goal is to provide a system with reusable components and customizable display settings, allowing each project to be tailored to specific needs.

At the moment, only one component called **Board** is implemented, which works similarly to a Trello-style Kanban board for organizing tasks. More components and features are planned for the future.

The application is currently optimized for desktop and tablet devices.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Branching Strategy](#branching-strategy)
- [Branch and Commit Naming](#branch-and-commit-naming)
- [Recommended Practices](#recommended-practices)
- [Deployment](#deployment)

## Tech Stack

This project is managed as a monorepo using [Turborepo](https://turbo.build/) together with [pnpm](https://pnpm.io/) workspaces.

### Frontend

- **Framework:** Vue.js 3 with TypeScript
- **State Management:** Pinia
- **UI Framework:** Quasar
- **HTTP Client:** Axios
- **Rendering:** Server-Side Rendering (SSR)
- **Build Tool:** Vite
- **Code Quality:** ESLint, Prettier, Stylelint
- **Tests:** Not implemented yet

### Backend

- **Framework:** Express.js with TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Tests:** Not implemented yet

## Getting Started

Clone this repository to your local machine using Git to set up the project locally.

Open the project in your IDE and run:

```sh
pnpm install
```

To start the development environment, run:

```sh
pnpm dev
```

The application should now be running locally.

⚠️ For access to a test account and login credentials, please contact the author.

## Project Structure

## Branching Strategy

This project follows a feature-based workflow:

- **Main branch (`main`)**: Contains stable, production-ready code
- **Staging branch (`dev`)**: Includes release-ready changes and ongoing development
- **Feature branches**: All new features and fixes are developed in separate branches created from `dev`

### Workflow

1. Create a new feature or fix branch based on the `dev` branch
2. Implement your changes in this feature branch
3. Create a merge request to merge your branch back into `dev`
   > ⚠️ Do not merge into `main` directly. This is not allowed
4. After a code review, the branch is merged into `dev` (only the author can approve it)
5. Once the changes are ready for release, `dev` is merged into `main` (only the author can perform this step)

## Branch and Commit Naming

All branch and commit names must follow the standard conventional naming format. Other naming types are not allowed.

### Branches

Branch names should use only lowercase letters and hyphens. Keep them short but descriptive.

Use the following prefixes:

- **feat/** – for new features
- **fix/** – for bug fixes
- **chore/** – for non-code tasks like dependency or documentation updates

Examples:

```sh
feat/new-feature

fix/header-bug

chore/update-dependencies
```

More information: [Conventional Branch](https://conventional-branch.github.io/)

### Commits

Commit messages should also use lowercase letters and follow this format:

```sh
<type>[optional scope]: <description>
```

Common types:

- **feat:** – introduces a new feature (correlates with MINOR in Semantic Versioning)
- **fix:** – fixes a bug (correlates with PATCH in Semantic Versioning)
- **refactor:** – improves code without changing functionality
- **chore:** – for non-code tasks (e.g. dependencies, documentation)

⚠️ Merge commits should follow this format: `chore: merge with ...`

```sh
feat: allow provided config object to extend other configs

fix: resolve issue with header

refactor: improve validation logic

chore: update dependencies

chore: merge with dev
```

More information: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Recommended Practices

For the frontend, the following conventions must be followed:

- Vue files should always be structured in this order: **template**, **script**, **style**
- The `<script>` block should use `setup` and `lang="ts"` (Composition API with TypeScript)
- All styles should be written in **SCSS** and should generally be **scoped**
- CSS properties must follow a specific order based on grouped rules
  - You can find the exact configuration in `.stylelintrc.json`
  - More information: [CSS Order Guide](https://9elements.com/css-rule-order/)
- Use predefined variables for **colors** and **fonts** from the global style variables file

> ⚠️ Before every commit, it is highly recommended to run the following command. It will automatically fix and format your code:

```sh
pnpm lint

# or

pnpm lint:fix
```

This ensures all code is formatted and follows the recommended rules.

## Deployment

This project is currently deployed using [Vercel](https://vercel.com), a simple and convenient deployment and hosting platform. This setup is temporary and may change in the future as the project grows or requires a different deployment solution.

Every merge into the `main` or `dev` branch triggers an automatic deployment on Vercel. Only the author has access to manage and control deployments.

- **Production (`main`):** https://flowfox.vercel.app/
- **Staging (`dev`):** https://stagingflowfox.vercel.app/

Once a deployment is successful, the application is live and can be accessed as a web app.

## Issues and future Changes
