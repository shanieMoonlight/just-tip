JustTip is a small Angular demo application (Nx workspace) for tracking and managing tips, shifts, rosters, and employees. It demonstrates a modern Angular approach using standalone components, reactive forms, signals, and a lightweight IO layer for server interactions.

**Quick Summary**
- **What it does:** Track tips by employee/week, manage roster & shifts, view employee summaries, and provide forms for adding or editing data.
- **Primary pages/features:** home dashboard, tips listing and entry, roster view, shifts (list/add/edit), employee list/detail, and several reusable UI components.
- **Core patterns:** Standalone components, reactive forms, small reusable and themable ui elements, small DI-friendly services for IO/storage, and Jest for unit testing.

## Run & build

- Start the dev server:

```sh
npx nx serve just-tip
```

- Build a production bundle:

```sh
npx nx build just-tip
```

- Show project targets:

```sh
npx nx show project just-tip
```

## What’s in the repo (high level)

- `src/` — Application source and assets.
	- `main.ts`, `main.server.ts`, `server.ts`, `index.html`, `styles.scss`
	- `app/` — Main application code:
		- `app.routes.ts` / `app.routes.server.ts` — Route definitions.
		- `pages/` — Feature pages:
			- `home/` — Home dashboard and navigation.
			- `tips/` — Tips listing and entry UI (`tips.ts`, `tips.html`).
			- `roster/` — Roster page and sample data (`roster.ts`, `roster.html`, `roster.json`).
			- `shifts/` — Subfolders for add/edit/list shift flows.
			- `employees/` — Employee list, detail and weekly summaries.
		- `data/` — Models and IO layer for server calls (`data/io`, `data/models`).
		- `ui/` — Reusable UI components and directives (buttons, cards, tooltip, notifications, forms, theming).
		- `utils/` — Helpers and small services (e.g., route helpers, test helpers).
	- `environments/` — `environment.ts` and `environment.prod.ts`.

## Files of interest
- App entry: [src/app/app.ts](src/app/app.ts)
- Routes: [src/app/app.routes.ts](src/app/app.routes.ts)
- Tips page: [src/app/pages/tips/tips.ts](src/app/pages/tips/tips.ts)
- Roster sample & page: [src/app/pages/roster/roster.ts](src/app/pages/roster/roster.ts) and [src/app/pages/roster/roster.json](src/app/pages/roster/roster.json)
- Employee pages: [src/app/pages/employees](src/app/pages/employees)
- IO layer and setup: [src/app/data/io](src/app/data/io)
- Models: [src/app/data/models](src/app/data/models)
- Reusable UI: [src/app/ui](src/app/ui) (tooltip directive, notifications, cards, forms)


## Navigating the App
- Navbar contains some useful buttons.
  - Left: database icon will refresh/initialize the database (Sqlite/Postgres depending on backend implementation)
  - Left: Just tip logo = go home button
  - Right: $ button = Add tip.
  - Right: Moon/Sun = Dark mode toggle
  - Right: Palette = change theme
- Home page
  - Cards eith links to Employee List, Roster and Tips Overview
- Employee List Page
  - List of simple employee cards (not paginated)
    - Click on card to see weekly Summary
    - Click on calendar to see shifts
  - Weekly Summary (By Employee) Page
    - Shows summary of whatever week is selected. Use arrows at top of page to change weeks
    - Button to add another shift.
  - Shifts Page
    - List of simple employee shifts (not paginated)
      - Click on card to edit shift
      - Click rubbish bin to delete shift
  - Roster Page
    - Simple table of current roster
    - If you click on a shift that's in the future you will nvaigate to edit shift
    - Use arrows at top of page to change weeks

## Testing

- Jest is configured for unit tests. Run tests with:

```sh
npx nx test just-tip
```

- Test config files: `jest.config.ts`, `jest.preset.js`, and `tsconfig.spec.json`.

## Development notes & conventions

- Standalone components and `inject()` are preferred across the codebase.
- Reactive forms are used for tip entry and edit flows.
- Small services encapsulate IO; look under `src/app/data/io` for the concrete API wrappers and `src/app/utils/services` for helper services.
- UI primitives (buttons, cards, tooltips) are implemented under `src/app/ui` for reuse.



## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)



## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-standalone-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
