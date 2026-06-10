# AGENTS.md

This file provides guidance to AI coding agents working with code in this repository.

## What this is

Honeycomb is Archilogic's Vue 3 design system library, published to npm as `@archilogic/honeycomb`. It is built as a Vite library (ESM + CJS) with `vue`, `@headlessui/vue`, and `tailwindcss` as peer dependencies. Storybook is the documentation and visual-testing surface (deployed to honeycomb.archilogic.com, visually tested via Chromatic).

## Commands

```sh
npm run storybook         # local Storybook dev server on port 6006 (primary dev environment)
npm run test              # vitest in watch mode
npx vitest run src/components/__tests__/Button.test.ts   # run a single test file
npm run typecheck         # vue-tsc against tsconfig.build.json
npm run lint              # eslint --fix on src
npm run format            # prettier write
npm run codecheck         # typecheck + lint + format in one go
npm run build             # vite build + emit component type declarations
npm run watch             # rebuild on change (for local linking into consumer apps)
npm run generate:icon-types  # regenerate src/components/icons/types.ts after adding/removing icons
```

Tests use Vitest with jsdom and Testing Library (`@testing-library/vue`); globals are enabled (`describe`/`it`/`expect` need no imports). Husky + lint-staged run vue-tsc, eslint, and prettier on commit.

## Releases

Publishing is fully automated with semantic-release: every merge to `main` triggers a release whose version is derived from conventional-commit messages. **PR titles / squash-merge commits must follow the conventional commits format** (`feat:`, `fix:`, `chore:`, with scopes like `feat(themes): ...`), since they determine version bumps and the changelog. Pushes to `beta`/`next` branches publish pre-releases on those dist channels; branches prefixed `test-` also publish pre-releases.

## Architecture

### Entry points and exports

`src/index.ts` is the main entry; it re-exports everything plus a `registerAllComponents(app)` helper. The package also exposes subpath exports built as separate Vite lib entries (see `vite.config.ts`):

- `./components` → `src/components/index.ts`
- `./composables` → `src/composables/index.ts` (multi-select and table-sorting logic)
- `./colors` → `src/colors/index.ts` (color map + CSS variable names)
- `./tailwind` → the `tailwind/` directory, shipped as-is (not built): CSS entry, theme variables, and the Tailwind preset consumers extend

### Components

All components live flat in `src/components/` and are exported with an `A` prefix (`Button.vue` → `AButton`). Note that the export name doesn't always match the file name (e.g. `AAppMenuButton` is `PopupButton.vue`). Components in `src/components/internal/` are implementation details and not exported. Many components wrap Headless UI primitives and use `@floating-ui/vue` for positioned popups. Tests live in `src/components/__tests__/`.

### Icons

SVG files in `src/components/icons/{sm,md,lg,other}/` are loaded eagerly via `import.meta.glob` (with `vite-svg-loader`, svgo disabled) into a size-keyed map consumed by `AIcon`. Folder = size: `sm/` 16x16, `md/` 32x32, `lg/` 40x40, `other/` everything else. When adding an icon: replace hardcoded colors with `currentColor`, then run `npm run generate:icon-types` to update the icon-name union types (`types.ts` is auto-generated — never edit it by hand). Deprecated icons are tracked in `DEPRECATED_ICONS` in `src/components/icons/index.ts`.

### Styling and theming

The design system's tokens live in the Tailwind preset (`tailwind/tailwind-preset.cjs`): a restricted spacing scale, custom shadows/radii, and colors from `tailwind/colorMap.json`. Colors support theming via CSS variables — `tailwind/variables.css` defines `--honeycomb-color-*` custom properties (defaults on `:root`), `colorMap.json` references them, and `src/colors/` exports the variable names for programmatic use. There are two copies of `colorMap.json` (`tailwind/` and `src/colors/`) — keep them in sync when changing colors. Prettier runs with `prettier-plugin-tailwindcss`, so class order is enforced.

### Stories

Every component has a story in `src/stories/` (mostly `.stories.mdx`, newer ones as `.stories.ts` + companion `.mdx` docs). Chromatic snapshots stories on every push, so visual changes to components will surface as Chromatic diffs requiring approval.
