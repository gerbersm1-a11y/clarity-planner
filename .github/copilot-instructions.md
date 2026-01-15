# Copilot Instructions for Clarity Planner

## Project Overview
Clarity Planner is a weekly planning app built with Next.js (App Router), React, TypeScript, and Tailwind CSS. It features a 7-day grid layout with 5 color-coded categories: Work, Personal, Health, Learning, and Leisure. The UI is minimalist, responsive, and supports dark mode.

## Architecture & Key Files
- **src/app/**: Next.js App Router structure. `page.tsx` is the main entry, `layout.tsx` is the root layout, and `globals.css` contains global styles.
- **src/components/**: UI components. `WeeklyPlanner.tsx` is the main planner, `TaskColumn.tsx` represents a day, and `TaskBox.tsx` is an individual task card. `PDFExport.tsx` provides export functionality.
- **src/context/TaskContext.tsx**: Centralized React Context for managing tasks and state across components.
- **src/types/index.ts**: TypeScript interfaces for tasks, categories, and planner data.

## Developer Workflows
- **Start Dev Server**: `npm run dev` (Next.js, hot reload)
- **Build**: `npm run build` (production build)
- **Lint**: `npm run lint` (uses ESLint config in `eslint.config.mjs`)
- **Production**: `npm start`
- **Docker**: Use `Dockerfile` and `docker-compose.yml` for containerized deployment.

## Patterns & Conventions
- **State Management**: Use `TaskContext` for all task-related state. Avoid prop drilling; always prefer context for cross-component data.
- **Component Structure**: Each UI element (planner, column, task) is a separate component. Compose them in `WeeklyPlanner.tsx`.
- **Category Colors**: Categories are mapped to specific colors. Follow the mapping in the planner components for consistency.
- **Type Safety**: All data structures (tasks, categories) should use interfaces from `src/types/index.ts`.
- **Styling**: Use Tailwind CSS classes. Avoid custom CSS except in `globals.css`.
- **Routing**: Use Next.js App Router conventions. Pages live in `src/app/`.

## Integration Points
- **PDF Export**: `PDFExport.tsx` enables exporting the planner view. Integrate with planner data via context.
- **Future Enhancements**: Drag-and-drop (planned via @dnd-kit), local storage, templates, and collaboration. Follow existing context and component patterns for new features.

## Examples
- To add a new category, update the category list and color mapping in both context and UI components.
- To persist tasks, extend `TaskContext` and integrate with browser storage APIs.

## Quick Start
1. `npm install`
2. `npm run dev`
3. Edit planner in browser at [http://localhost:3000](http://localhost:3000)

---
For more details, see `README.md` and `src/context/TaskContext.tsx`.
