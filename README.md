# OpenAPI Example

This repository contains an OpenAPI 3.0 specification for a Warehouse Management API. The spec lives in `openapi.yaml` and defines endpoints for warehouses, products, and inventory operations.

**What this repo does**

- Serves a single OpenAPI spec file (`openapi.yaml`)
- Publishes API documentation to GitHub Pages
- Automates versioning and release notes with semantic-release

**Workflow overview**

- Deploy OpenAPI Docs: triggered on pushes to `main` that touch `openapi.yaml` or the workflow file, or via manual dispatch
- Release: triggered on every push to `main`, runs semantic-release

**1. Generate GitHub Pages for OpenAPI**

1. Ensure GitHub Pages is enabled for the repository
2. Set Pages Source to GitHub Actions
3. Commit changes to `openapi.yaml` on `main`
4. The Deploy OpenAPI Docs workflow builds a `public/` folder containing:
   - `openapi.yaml`
   - `index.html` using Scalar API Reference
5. GitHub Pages publishes the result to the Pages URL shown in the workflow run

**2. Generate versioning with semantic-release (first-time setup)**

1. Install Git hooks to enforce Conventional Commits

```bash
./scripts/setup_hooks.sh
```

2. Commit changes using Conventional Commits (see below)
3. Push to `main`
4. The Release workflow installs semantic-release and runs it with `GITHUB_TOKEN`
5. semantic-release analyzes commits, creates a tag, and publishes a GitHub Release

**3. How semantic-release works in this repo**

- Uses the Conventional Commits preset for commit analysis
- Releases only from the `main` branch
- Generates GitHub Release notes and tags
- Custom rules:
  - `refactor` and `style` are treated as patch releases
- Release note sections are grouped by type:
  - Features, Fixes, Performance, Reverts, Docs, Styles, Chores, Refactor, Tests, Build, CI

**Release bump rules**

- Major: any commit with `!` in the header or `BREAKING CHANGE:` in the body
- Minor: any `feat` commit without a breaking change
- Patch: any `fix` commit, plus `refactor` and `style`
- No version bump: docs, perf, test, build, ci, chore, revert (unless marked breaking)

**4. Conventional Commits standard**
Format:

```text
<type>(<scope>): <subject>
```

Rules enforced by the commit-msg hook:

- `type` must be one of: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- `scope` is optional but recommended
- `subject` must be 1–72 characters

Examples:

```text
feat(api): add /warehouses endpoint
fix(spec): correct schema typo
docs(readme): explain release flow
```

Breaking changes:

- Use `!` after the type or scope, for example `feat(api)!: remove legacy endpoint`
- Or add `BREAKING CHANGE:` in the commit body

**5. Commit types explained**

- feat: new features, adds endpoints or capabilities
- fix: bug fixes or corrections to the spec
- docs: documentation-only changes
- style: formatting changes with no spec behavior impact
- refactor: code or spec restructuring without behavior change
- perf: performance improvements in tooling or generation
- test: adding or updating tests or examples
- build: build system or tooling changes
- ci: workflow and CI configuration changes
- chore: maintenance tasks, dependencies, cleanup
- revert: reverts a previous commit
