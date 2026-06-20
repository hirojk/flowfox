# Contributing to Pagewise

Thank you for your interest in contributing to Pagewise.

This document outlines the development workflow, naming conventions, and coding practices to ensure consistency across the project.

## Table of Contents

- [Branching Strategy](#branching-strategy)
- [Branch and Commit Naming](#branch-and-commit-naming)
- [Recommended Practices](#recommended-practices)
- [Code Quality](#code-quality)
- [Testing](#testing)

## Branching Strategy

This project follows a feature-based workflow:

- **main** → stable, production-ready code
- **dev** → active development and staging
- **feature branches** → all changes are developed from `dev`

### Workflow

1. Create a new feature or fix branch from `dev`
2. Implement your changes
3. Open a merge request targeting `dev` (⚠️ Direct merges into `main` are not allowed)
4. After review, the branch is merged into `dev`
5. When ready for release, `dev` is merged into `main`

## Branch and Commit Naming

All branches and commits must follow conventional naming standards.

### Branch Naming

- Use lowercase letters and hyphens only
- Keep names short and descriptive

**Prefixes:**

- `feat/` → new features
- `fix/` → bug fixes
- `chore/` → maintenance or non-code changes

**Examples:**

```sh
feat/new-feature
fix/header-bug
chore/update-dependencies
```

More information: [Conventional Branch](https://conventional-branch.github.io/)

### Commits

Use the following format:

```sh
<type>(optional scope): <description>
```

Common types:

- **feat:** – new feature
- **fix:** – bug fix
- **refactor:** – code improvements without behavior changes
- **chore:** – maintenance tasks

⚠️ Merge commits should follow: `chore: merge with <branch> from PR #<pr-number>`

```sh
feat: add configurable board layout
fix: resolve header rendering issue
refactor: improve validation logic
chore: update dependencies
chore: merge with dev
```

More information: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Recommended Practices

For the frontend, the following conventions must be followed:

- Structure Vue files in this order: **template** → **script** → **style**
- Use `<script setup lang="ts">` (Composition API with TypeScript)
- Write styles in **SCSS**, preferably **scoped**
- CSS properties must follow a specific order based on grouped rules
  - You can find the exact configuration in `.stylelintrc.json`
  - More information: [CSS Order Guide](https://9elements.com/css-rule-order/)
- Use predefined variables for **colors** and **fonts**

## Code Quality

⚠️ Before every commit, it is highly recommended to run the following command. It will automatically fix and format your code:

```sh
pnpm lint
# or
pnpm lint:fix
```

This ensures consistent formatting and adherence to project standards.

## Testing

The project uses Vitest for unit and integration testing across all packages.

- **Backend** – Unit tests cover API responses, helper functions, and the authentication middleware to ensure correct request handling and security behavior.
- **Frontend** – Tests focus on the AuthService, validating authentication flows and session handling.
- **Shared package** – Tests verify schemas and utility/helper functions to ensure consistent validation and reusable logic across the application.

Run all tests from the repository root:

```sh
pnpm test
```

This command executes the full Vitest test suite across backend, frontend, and shared workspace packages in watch mode, automatically re-running tests whenever changes are detected.
