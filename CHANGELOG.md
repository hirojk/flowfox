# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project follows [Semantic Versioning](https://semver.org/).

## [0.1.1] - 2026-05-22

### Added

- Improved accessibility support for better screen reader compatibility

### Fixed

- Fixed touch and input behavior on iOS web app

### Changed

- Restructured project architecture into `apps/` and `packages/` for better monorepo organization
- Migrated application from SPA to SSR architecture

## [0.1.0] - 2026-04-11

### Added

- Initial release of Flowfox App
- Projects can be add, renamed, and deleted
- Core **Board** component (Kanban-style task management)
  - Boards can be created, renamed, and deleted
  - Columns can be created, renamed, and deleted
  - Columns can be reordered by holding for 1 seconds
  - Cards can be created and deleted
  - Cards include priority, description, and checklist features
  - Board settings allow toggling the visibility of priority, description, and checklist fields
- Basic frontend and backend architecture
- Monorepo setup using Turborepo and pnpm workspaces
- Shared package for reusable utilities, schemas, and constants
- Deployment setup using Vercel (production and staging environments)

### Notes

- Application is optimized for desktop and tablet devices
- This is an early-stage release and may contain UI/UX limitations

## [Unreleased]

### Planned

- UX/UI redesign and visual improvements
- Introduction of automated testing (frontend and backend)
- Additional reusable components beyond the Board
- General stability and performance improvements
