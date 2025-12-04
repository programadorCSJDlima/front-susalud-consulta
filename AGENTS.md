# Repository Guidelines

## Project Structure & Module Organization
- Keep app code in `src/`, organized by feature (`features/<domain>/components`, `pages/`, `shared/`).
- Store static assets in `public/`; reference via relative paths to avoid bundler issues.
- Mirror production code with tests in `tests/` or alongside files; keep fixtures/stubs in `tests/fixtures`.
- Place scripts and configs (`lint`, `format`, CI) under `scripts/` and `config/`; document any new folder you add.

## Build, Test, and Development Commands
- `npm install` (Node 18+ recommended): install dependencies.
- `npm run dev`: start the local dev server for interactive development.
- `npm run build`: create an optimized production bundle.
- `npm run preview`: serve the built bundle to verify production output.
- `npm test`: run unit/integration tests; add `-- --watch` for TDD loops.
- `npm run lint` / `npm run format`: enforce ESLint/Prettier rules and auto-format.

## Coding Style & Naming Conventions
- Use TypeScript where possible; 2-space indent, single quotes, trailing commas, and `const` by default.
- React components in PascalCase (`UserCard`); hooks prefixed with `use`; utility modules in camelCase.
- File/folder names in kebab-case except React component files (PascalCase). Avoid default exports; prefer named exports.
- Keep components small, presentational vs. container split; co-locate CSS modules as `Component.module.css`.

## Testing Guidelines
- Prefer Jest/Vitest with Testing Library for UI. Name files `*.spec.ts[x]` to mirror the module under test.
- Cover success and failure paths; mock network calls at the boundary; keep snapshots narrow and stable.
- Run `npm test -- --coverage` before merging; target >=80% line coverage and justify exceptions in the PR.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`); keep subject lines imperative and <=72 chars.
- Scope PRs narrowly; include a short description, linked issue, and UI screenshots when applicable.
- Confirm lint/tests pass locally before opening; mention any follow-ups or TODOs explicitly in the PR body.

## Security & Configuration Tips
- Do not commit secrets; use environment files (`.env.local`, `.env.production`) kept out of version control.
- Configure API endpoints and keys via env vars; avoid hard-coded URLs. Rotate credentials if leaked.
- Run `npm audit`/`npm outdated` regularly and upgrade high-severity findings before release.
