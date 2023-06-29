# Honeycomb - Archilogic's Design System library

This UI library is the implementation of Archilogic's Design System, formerly known as `ui-components`.

To install the v2 release (public on npm),
run `npm i @archilogic/honeycomb`

Honeycomb components require Vue (v3), Tailwind CSS, and Headless UI libraries to work correctly.

[Figma design files](https://www.figma.com/file/rsElRZClpRdcKlakIrlwOP/Honeycomb-2.0?node-id=0%3A1)

[Storybook documentation](https://honeycomb.archilogic.com)

## Usage

Please refer to our [Storybook docs](https://honeycomb.archilogic.com) for the most current and complete documentation.

## Development

To get started with local development, clone the repo and run `nvm use && npm install`.

### Storybook

To run a local Storybook dev server:

```

npm run storybook

```

### Testing and CI/CD

To run unit tests ([Vitest](https://vitest.dev/)):

```

npm run test

```

Automated visual testing is set up with [Storybook](https://storybook.js.org/) and [Chromatic](https://www.chromatic.com).
_(Everyone in Archilogic Github organization can log into [Archilogic organization in Chromatic](https://www.chromatic.com/settings?accountId=61323c349738e8003aa86aa5))_

Each branch is deployed to Chromatic on `push` via [GitHub Actions](https://docs.github.com/en/actions/quickstart).

### Release

Version management and publishing of this library are done with [semantic-release](https://github.com/semantic-release/semantic-release).

On each merge to the `main` branch the `release` workflow will be triggered. It will determine the new version, publish the new package to npm, create a GitHub release, as well as update the changelog and `package.json`. This package version will be published on the `@latest` distribution channel.

Each push to the `beta` and `next` branches will trigger a pre-release on the `@beta` and `@next` distribution channels correspondingly.

A push to any branch starting with `test-` will publish a pre-release.

For this process to work as expected, make sure to adhere to the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format when merge-squashing PRs.

### Build

```

npm run build

```

Use `npm run watch` when developing as a locally linked dependency.

### Dependencies update

Dependencies updates are [managed by dependabot](./.github/dependabot.yml). Dependabot’s pull requests can be bundled together by the [Combine PRs](https://github.com/archilogic-com/actions/actions/workflows/combine-prs.yml) action (click on “Run workflow”). It should work with all the default settings, but you have to enter “ui-components” for the repository name. To keep a clean change history, please make sure to squash-merge the PR resulting from running [Combine PRs](https://github.com/archilogic-com/actions/actions/workflows/combine-prs.yml).

### Adding icons

1. inspect the icon in Figma
1. right-click "Copy/Paste as" > "Copy as SVG" or use the "Export" section of the "Design" tab in the left sidebar panel.
1. (optional) paste the SVG snippet in [SVG OMG](https://jakearchibald.github.io/svgomg/)
1. (optional) copy the optimized SVG snippet
1. create a new .svg file. The size of the icon determines its target folder: `sm/` 16x16, `md/` 32x32, `lg/` 40x40, `other/` everything else
1. replace (some) colors with `currentColor` so the color of the icon can be set via CSS

### IDE Recommended Plugins

Please check the [VS Code recommended plugins](https://www.notion.so/archilogic/VS-Code-recommended-plugins-2715cd2f189c4e9386b4a15de0a404e2) page for a list of suggested extensions for the project.
