# ADR 0002: Monorepo with Turborepo

## Status

Accepted

## Context

Backend and storefront evolve together: a catalog field added on the backend
(e.g. nutritional metadata) lands on the storefront PDP in the same change.
Separate repositories would mean coordinated pull requests, duplicated
tooling and version drift between the two halves.

## Decision

A single repository with **npm workspaces** (`apps/backend`,
`apps/storefront`) orchestrated by **Turborepo**.

- `npm run dev` boots both apps with one command;
- Turbo caches task outputs and only rebuilds what changed;
- Cross-cutting changes (catalog schema + PDP rendering) ship atomically in
  one commit;
- Shared tooling (eslint, prettier, TypeScript) configured once at the root.

## Consequences

- One `package-lock.json` governs both apps — dependency upgrades are
  reviewed in one place;
- Workspace-scoped commands (`npm run seed -w @crevellari/backend`) replace
  per-repo scripts;
- CI runs against the whole workspace, keeping both apps compiling on every
  change.
