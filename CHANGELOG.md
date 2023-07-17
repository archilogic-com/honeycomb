# Changelog

# [2.2.0](https://github.com/archilogic-com/honeycomb/compare/v2.1.3...v2.2.0) (2023-07-17)


### Bug Fixes

* **listbox+combobox:** render options panel outside of scrollable container AL-4547 ([654675e](https://github.com/archilogic-com/honeycomb/commit/654675ea31e820862372b74d73b2204e210b0376))


### Features

* **infra:** Switch to using AWS CodeCommit for repository backup ([#15](https://github.com/archilogic-com/honeycomb/issues/15)) ([cc7c560](https://github.com/archilogic-com/honeycomb/commit/cc7c560285bd7317bc6d2ac509ef35cffefe9552))

## [2.1.3](https://github.com/archilogic-com/honeycomb/compare/v2.1.2...v2.1.3) (2023-06-30)


### Bug Fixes

* **dialog:**  click inside panel not close dialog ([007e2e9](https://github.com/archilogic-com/honeycomb/commit/007e2e9da59785dc5a4fa86667a7e822a1cb1ebb))

## [2.1.2](https://github.com/archilogic-com/ui-components/compare/v2.1.1...v2.1.2) (2023-06-29)


### Bug Fixes

* **textinput:** only pass css attrs to hidden div ([#331](https://github.com/archilogic-com/ui-components/issues/331)) ([81dea60](https://github.com/archilogic-com/ui-components/commit/81dea60a3e732326464c224f3533397019c9b527))

## [2.1.1](https://github.com/archilogic-com/ui-components/compare/v2.1.0...v2.1.1) (2023-06-28)


### Bug Fixes

* **dialog, panel:** fix vertical overflow ([#330](https://github.com/archilogic-com/ui-components/issues/330)) ([a535a4b](https://github.com/archilogic-com/ui-components/commit/a535a4b46b30cd8f794eee2bf40492a68baaccba))

# [2.1.0](https://github.com/archilogic-com/ui-components/compare/v2.0.6...v2.1.0) (2023-06-27)


### Features

* **popup, combobox:** combobox popup  Al 4431 ([#329](https://github.com/archilogic-com/ui-components/issues/329)) ([46d7891](https://github.com/archilogic-com/ui-components/commit/46d78917bd0ef0eee0506c8982911deba9564e1f))

## [2.0.6](https://github.com/archilogic-com/ui-components/compare/v2.0.5...v2.0.6) (2023-06-07)


### Bug Fixes

* **combobox:** move multiselect tags inside the input container Al 4127  ([#302](https://github.com/archilogic-com/ui-components/issues/302)) ([44b454b](https://github.com/archilogic-com/ui-components/commit/44b454b2833bb79086a87f1bee16593356834c67))

## [2.0.5](https://github.com/archilogic-com/ui-components/compare/v2.0.4...v2.0.5) (2023-05-25)


### Bug Fixes

* **infra:** add typechecking for vue files ([#294](https://github.com/archilogic-com/ui-components/issues/294)) ([62f5a8f](https://github.com/archilogic-com/ui-components/commit/62f5a8ff95a476d4cd5b7d584f94f8f69f32a763))

## [2.0.4](https://github.com/archilogic-com/ui-components/compare/v2.0.3...v2.0.4) (2023-05-22)


### Bug Fixes

* **tag:** fix aria-label ([#280](https://github.com/archilogic-com/ui-components/issues/280)) ([62ab5c2](https://github.com/archilogic-com/ui-components/commit/62ab5c26b240a9f84e5b8cd10afee55e2c1445f5))

## [2.0.3](https://github.com/archilogic-com/ui-components/compare/v2.0.2...v2.0.3) (2023-05-08)


### Bug Fixes

* **deps:** update tabbable ([2a40ed0](https://github.com/archilogic-com/ui-components/commit/2a40ed038d8f0734d5db9c875a20722d3c1dce2b))

## [2.0.2](https://github.com/archilogic-com/ui-components/compare/v2.0.1...v2.0.2) (2023-04-28)


### Bug Fixes

* **panel:** remove empty space if no title, add stories ([#277](https://github.com/archilogic-com/ui-components/issues/277)) ([4d17f44](https://github.com/archilogic-com/ui-components/commit/4d17f44be29aa04d5093f8dbbc1900deb06b19bb))

## [2.0.1](https://github.com/archilogic-com/ui-components/compare/v2.0.0...v2.0.1) (2023-04-28)


### Bug Fixes

* **combobox:** disabled multiselect ([0e18ff2](https://github.com/archilogic-com/ui-components/commit/0e18ff234f0069d81b7891cefa60230e6d95fa70))

# [2.0.0](https://github.com/archilogic-com/ui-components/compare/v1.36.0...v2.0.0) (2023-04-20)


### Bug Fixes

* **app-menu-item:** add role "menuitem" for links ([#268](https://github.com/archilogic-com/ui-components/issues/268)) ([79d2ca1](https://github.com/archilogic-com/ui-components/commit/79d2ca1a14e40d6ca61daeb8e4302d60e2068841))
* **inputs:** change default placeholders ([#263](https://github.com/archilogic-com/ui-components/issues/263)) ([ed27909](https://github.com/archilogic-com/ui-components/commit/ed279093b51fbeccc3ebf475a96404ee4c56a541))
* **toasts:** emit dismiss event after transition ([#259](https://github.com/archilogic-com/ui-components/issues/259)) ([4479e00](https://github.com/archilogic-com/ui-components/commit/4479e00c9c9bdcca3497f26729addf5eb9cfb21b))
* **types:** use separate tsconfig for declaration ([#267](https://github.com/archilogic-com/ui-components/issues/267)) ([eefa3ca](https://github.com/archilogic-com/ui-components/commit/eefa3ca7b47b886cd9a90d48a9dd1a4f9eba4dbc))


* feat(menu) remove menu and menu-item components (#264) ([af23a22](https://github.com/archilogic-com/ui-components/commit/af23a22f1af305da7b4703d231da25100bbe081d)), closes [#264](https://github.com/archilogic-com/ui-components/issues/264)
* feat(icons)!: set  aria-hidden, remove label prop (#255) ([ec77e8b](https://github.com/archilogic-com/ui-components/commit/ec77e8bdc59006ca18118fbcfb019604e315af50)), closes [#255](https://github.com/archilogic-com/ui-components/issues/255)


### Features

* **address-input:** remove ([#235](https://github.com/archilogic-com/ui-components/issues/235)) ([9b1d5d9](https://github.com/archilogic-com/ui-components/commit/9b1d5d939c471b0fdd9960a2151fc37324b04912))
* **app-menu:** support links ([#266](https://github.com/archilogic-com/ui-components/issues/266)) ([b6b6658](https://github.com/archilogic-com/ui-components/commit/b6b6658a8967734bf2b7ce2aa0948094ef76f1dd))
* change package name, make public ([#244](https://github.com/archilogic-com/ui-components/issues/244)) ([58cc02b](https://github.com/archilogic-com/ui-components/commit/58cc02b62eea751af76248b07916d94878a4ec58))
* **dialog, panel:** add panel component, refactor dialog slots to use panel ([#269](https://github.com/archilogic-com/ui-components/issues/269)) ([65c8b10](https://github.com/archilogic-com/ui-components/commit/65c8b102a3012281c3f801fa785a101973af1944))
* **icons:** remove deprecated icons ([13f3f13](https://github.com/archilogic-com/ui-components/commit/13f3f13f9d455798624ed00b49b31e8c0930d44f))
* **nav-item:** remove deprecated badge prop, slot ([8ac390b](https://github.com/archilogic-com/ui-components/commit/8ac390b70c9920cbca0cf2e9b63e3f47427634c3))
* popup  and popup-button components ([#273](https://github.com/archilogic-com/ui-components/issues/273)) ([1ab1e2a](https://github.com/archilogic-com/ui-components/commit/1ab1e2a2b05b963de93d4161b9e3023dd929c27e))
* remove deprecated component aliases ([ff7c399](https://github.com/archilogic-com/ui-components/commit/ff7c3993c332741b86a82a81ad8ad4ace24416ae))
* rename props  al-3723 ([#257](https://github.com/archilogic-com/ui-components/issues/257)) ([2363864](https://github.com/archilogic-com/ui-components/commit/236386414292699f4016e95d02fe45de00d855a1))
* **select:** remove deprecated select component ([fcdff62](https://github.com/archilogic-com/ui-components/commit/fcdff622661dace2d5df35eeb5f116b01f261ce8))
* **tag:** remove deprecated `variant` prop ([e9a7e91](https://github.com/archilogic-com/ui-components/commit/e9a7e91fe19b972c48f6458e6fdd06b0e2716f10))
* **useMultiSelect:** remove last param ([#258](https://github.com/archilogic-com/ui-components/issues/258)) ([f57d575](https://github.com/archilogic-com/ui-components/commit/f57d575322fcc0639a5c5d0373762478a673e93f))


### BREAKING CHANGES

* removed a-menu component.
* **app-menu:** * `a-app-menu-item` emits`@select` event instead of requiring `activate-callback` prop

* `a-app-menu-item` new props:  `href`, `shortcut`

* docs improvements
* **toasts:** removed `message` prop, `open` prop default value change to `true`, the component emits `@dismiss` event after the fade-away transition is finished
* rename boolean props, e.g. isOpen -> open
affected components:
AppMenu: (slot props)isOpen -> open
AppMenuButton: isOpen -> open, showPressed -> pressed
AppMenuMultiButton: isMenuOpen -> open, isPressed -> pressed
Menu: opened -> open
Dialog: verticalAlignment -> position

* fix(logo-button): aria-label value
* **useMultiSelect:** removed last argument of useMultiSelect composable.
* `a-icon`'s `label` prop is removed. The component no longer has `aria-label` attribute set by default. Instead, it is `aria-hidden`. You can set an accessible label manually on the `a-icon` or it's parent component when appropriate.

Note: some tests that relied on icon's aria label might need updating after this change.
* remove deprecated component aliases. Use the following component names instead:

- AListboxOption -> AOption
- AListboxOptionGroup -> AOptionGroup
- ABadge -> ACounter
- AChip -> AStatus
* **icons:** remove deprecated icons:
- size "other" : Area', 'Draw', 'DrawLocked', 'Length', 'Offline', 'Processing', 'Redo', 'Undo'
- size "md": 'Direction'
* **tag:** remove `a-tag` "variant" prop ("square" and "round").
The previous default `round` variant style is applied to all  `a-tag`s.
* **nav-item:** remove deprecated `badge` prop and`badge` slot from a-nav-item.
Use new `counter` prop and/or `extra` slot instead.
* **select:** remove deprecated `<a-select>` component. Use `<a-listbox>` or `<a-combobox>` instead.
* package name update, publish to public npm registry
* **address-input:** remove a-address-input component
and related google maps types and api key.
Equivalent component has been previously added to @archilogic/app-kit private package

# [2.0.0-beta.18](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2023-04-20)


### Bug Fixes

* **infra:** use correct key for node-version-file ([#275](https://github.com/archilogic-com/ui-components/issues/275)) ([7fe0331](https://github.com/archilogic-com/ui-components/commit/7fe0331023bd9f1d198d1d4183d79650551ab771))


### Features

* **app-menu:** add a group title component ([#271](https://github.com/archilogic-com/ui-components/issues/271)) ([04d52de](https://github.com/archilogic-com/ui-components/commit/04d52de7d4988ddd01c4b42a0b8f3f6c6c32a0af))
* **infra:** support more node versions in package.json#engines ([ba7d2d1](https://github.com/archilogic-com/ui-components/commit/ba7d2d170294f510678bcc7f454c7619878b6ce3))

## [1.36.1](https://github.com/archilogic-com/ui-components/compare/v1.36.0...v1.36.1) (2023-04-27)


### Bug Fixes

* **combobox:** disabled multiselect ([0e18ff2](https://github.com/archilogic-com/ui-components/commit/0e18ff234f0069d81b7891cefa60230e6d95fa70))

# [1.36.0](https://github.com/archilogic-com/ui-components/compare/v1.35.0...v1.36.0) (2023-04-19)


### Bug Fixes

* **infra:** use correct key for node-version-file ([#275](https://github.com/archilogic-com/ui-components/issues/275)) ([7fe0331](https://github.com/archilogic-com/ui-components/commit/7fe0331023bd9f1d198d1d4183d79650551ab771))


### Features

* **infra:** support more node versions in package.json#engines ([ba7d2d1](https://github.com/archilogic-com/ui-components/commit/ba7d2d170294f510678bcc7f454c7619878b6ce3))

# [2.0.0-beta.17](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2023-04-19)


### Features

* popup  and popup-button components ([#273](https://github.com/archilogic-com/ui-components/issues/273)) ([1ab1e2a](https://github.com/archilogic-com/ui-components/commit/1ab1e2a2b05b963de93d4161b9e3023dd929c27e))

# [2.0.0-beta.16](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2023-04-06)


### Features

* **dialog, panel:** add panel component, refactor dialog slots to use panel ([#269](https://github.com/archilogic-com/ui-components/issues/269)) ([65c8b10](https://github.com/archilogic-com/ui-components/commit/65c8b102a3012281c3f801fa785a101973af1944))

# [2.0.0-beta.15](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2023-03-29)


* feat(menu) remove menu and menu-item components (#264) ([af23a22](https://github.com/archilogic-com/ui-components/commit/af23a22f1af305da7b4703d231da25100bbe081d)), closes [#264](https://github.com/archilogic-com/ui-components/issues/264)


### BREAKING CHANGES

* removed a-menu component.

# [2.0.0-beta.14](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2023-03-29)


### Bug Fixes

* **app-menu-item:** add role "menuitem" for links ([#268](https://github.com/archilogic-com/ui-components/issues/268)) ([79d2ca1](https://github.com/archilogic-com/ui-components/commit/79d2ca1a14e40d6ca61daeb8e4302d60e2068841))

# [2.0.0-beta.13](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2023-03-27)


### Bug Fixes

* **types:** use separate tsconfig for declaration ([#267](https://github.com/archilogic-com/ui-components/issues/267)) ([eefa3ca](https://github.com/archilogic-com/ui-components/commit/eefa3ca7b47b886cd9a90d48a9dd1a4f9eba4dbc))

# [2.0.0-beta.12](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2023-03-22)


### Features

* **app-menu:** support links ([#266](https://github.com/archilogic-com/ui-components/issues/266)) ([b6b6658](https://github.com/archilogic-com/ui-components/commit/b6b6658a8967734bf2b7ce2aa0948094ef76f1dd))


### BREAKING CHANGES

* **app-menu:** * `a-app-menu-item` emits`@select` event instead of requiring `activate-callback` prop

* `a-app-menu-item` new props:  `href`, `shortcut`

* docs improvements

# [2.0.0-beta.11](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2023-03-22)


### Features

* **combobox, listbox:** show color circle for options and selected value ([#262](https://github.com/archilogic-com/ui-components/issues/262)) ([cb80703](https://github.com/archilogic-com/ui-components/commit/cb80703db817f3e6da4ae4e601cbf3004106cb39))

# [2.0.0-beta.10](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2023-03-13)


### Bug Fixes

* **inputs:** change default placeholders ([#263](https://github.com/archilogic-com/ui-components/issues/263)) ([ed27909](https://github.com/archilogic-com/ui-components/commit/ed279093b51fbeccc3ebf475a96404ee4c56a541))

# [2.0.0-beta.9](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2023-03-09)


### Bug Fixes

* **infra:** fix git credentials in semantic-release workflow ([#260](https://github.com/archilogic-com/ui-components/issues/260)) ([714ae8c](https://github.com/archilogic-com/ui-components/commit/714ae8c68fbd320b2e5fb013a4c49202a2b2a8bf))
* **nav-sidebar:** add height property ([#253](https://github.com/archilogic-com/ui-components/issues/253)) ([7f6739e](https://github.com/archilogic-com/ui-components/commit/7f6739eb1e52cf789e06e991cc3c631f8b86e8b8))


### Features

* **disclosure:** use the open prop not only on component initialization ([cae528f](https://github.com/archilogic-com/ui-components/commit/cae528fc1deae08faa3745c1053889b35301a995))

# [1.35.0](https://github.com/archilogic-com/ui-components/compare/v1.34.0...v1.35.0) (2023-04-12)


### Features

* **app-menu:** add a group title component ([#271](https://github.com/archilogic-com/ui-components/issues/271)) ([04d52de](https://github.com/archilogic-com/ui-components/commit/04d52de7d4988ddd01c4b42a0b8f3f6c6c32a0af))

# [1.34.0](https://github.com/archilogic-com/ui-components/compare/v1.33.2...v1.34.0) (2023-03-10)


### Features

* **combobox, listbox:** show color circle for options and selected value ([#262](https://github.com/archilogic-com/ui-components/issues/262)) ([cb80703](https://github.com/archilogic-com/ui-components/commit/cb80703db817f3e6da4ae4e601cbf3004106cb39))

## [1.33.2](https://github.com/archilogic-com/ui-components/compare/v1.33.1...v1.33.2) (2023-03-07)


### Bug Fixes

* **infra:** fix git credentials in semantic-release workflow ([#260](https://github.com/archilogic-com/ui-components/issues/260)) ([714ae8c](https://github.com/archilogic-com/ui-components/commit/714ae8c68fbd320b2e5fb013a4c49202a2b2a8bf))

## [1.33.1](https://github.com/archilogic-com/ui-components/compare/v1.33.0...v1.33.1) (2023-02-21)


### Bug Fixes

* **nav-sidebar:** add height property ([#253](https://github.com/archilogic-com/ui-components/issues/253)) ([7f6739e](https://github.com/archilogic-com/ui-components/commit/7f6739eb1e52cf789e06e991cc3c631f8b86e8b8))

# [1.33.0](https://github.com/archilogic-com/ui-components/compare/v1.32.0...v1.33.0) (2023-02-21)


### Features

* **disclosure:** use the open prop not only on component initialization ([cae528f](https://github.com/archilogic-com/ui-components/commit/cae528fc1deae08faa3745c1053889b35301a995))

# [2.0.0-beta.8](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2023-03-03)


### Bug Fixes

* **toasts:** emit dismiss event after transition ([#259](https://github.com/archilogic-com/ui-components/issues/259)) ([4479e00](https://github.com/archilogic-com/ui-components/commit/4479e00c9c9bdcca3497f26729addf5eb9cfb21b))


### BREAKING CHANGES

* **toasts:** removed `message` prop, `open` prop default value change to `true`, the component emits `@dismiss` event after the fade-away transition is finished

# [2.0.0-beta.7](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2023-02-28)


### Features

* rename props  al-3723 ([#257](https://github.com/archilogic-com/ui-components/issues/257)) ([2363864](https://github.com/archilogic-com/ui-components/commit/236386414292699f4016e95d02fe45de00d855a1))
* **useMultiSelect:** remove last param ([#258](https://github.com/archilogic-com/ui-components/issues/258)) ([f57d575](https://github.com/archilogic-com/ui-components/commit/f57d575322fcc0639a5c5d0373762478a673e93f))


### BREAKING CHANGES

* rename boolean props, e.g. isOpen -> open
affected components:
AppMenu: (slot props)isOpen -> open
AppMenuButton: isOpen -> open, showPressed -> pressed
AppMenuMultiButton: isMenuOpen -> open, isPressed -> pressed
Menu: opened -> open
Dialog: verticalAlignment -> position

* fix(logo-button): aria-label value
* **useMultiSelect:** removed last argument of useMultiSelect composable.

# [2.0.0-beta.6](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2023-02-27)


* feat(icons)!: set  aria-hidden, remove label prop (#255) ([ec77e8b](https://github.com/archilogic-com/ui-components/commit/ec77e8bdc59006ca18118fbcfb019604e315af50)), closes [#255](https://github.com/archilogic-com/ui-components/issues/255)


### BREAKING CHANGES

* `a-icon`'s `label` prop is removed. The component no longer has `aria-label` attribute set by default. Instead, it is `aria-hidden`. You can set an accessible label manually on the `a-icon` or it's parent component when appropriate.

Note: some tests that relied on icon's aria label might need updating after this change.

# [2.0.0-beta.5](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2023-02-15)


### Bug Fixes

* **button:** aria-label generation ([#250](https://github.com/archilogic-com/ui-components/issues/250)) ([9d2d395](https://github.com/archilogic-com/ui-components/commit/9d2d3951570411d7302f6a6e7807eb79d1cfa021))
* **button:** hover, active styles for link buttons ([#248](https://github.com/archilogic-com/ui-components/issues/248)) ([0a1c89e](https://github.com/archilogic-com/ui-components/commit/0a1c89edc55532bae4628dd04a4242b64ea4ba2f))


### Features

* **button, logo:** button size auto, icon prop change, logo-button component al-2237 ([#249](https://github.com/archilogic-com/ui-components/issues/249)) ([98b79ea](https://github.com/archilogic-com/ui-components/commit/98b79ea2a0166231be7fd16a44528717f9be9417))
* **nav:** heading prop for navItem, docs cleanup ([#251](https://github.com/archilogic-com/ui-components/issues/251)) ([6c03556](https://github.com/archilogic-com/ui-components/commit/6c03556a8a8a15594c2f8f971ae0f8c3e277a024))
* **text-input:** show character counter if `maxlength` is set al-3432 ([#247](https://github.com/archilogic-com/ui-components/issues/247)) ([20eca3a](https://github.com/archilogic-com/ui-components/commit/20eca3af68d39980a6c23fae89fbf51255632e30))

# [1.32.0](https://github.com/archilogic-com/ui-components/compare/v1.31.1...v1.32.0) (2023-02-15)


### Features

* **nav:** heading prop for navItem, docs cleanup ([#251](https://github.com/archilogic-com/ui-components/issues/251)) ([6c03556](https://github.com/archilogic-com/ui-components/commit/6c03556a8a8a15594c2f8f971ae0f8c3e277a024))

## [1.31.1](https://github.com/archilogic-com/ui-components/compare/v1.31.0...v1.31.1) (2023-02-13)


### Bug Fixes

* **button:** aria-label generation ([#250](https://github.com/archilogic-com/ui-components/issues/250)) ([9d2d395](https://github.com/archilogic-com/ui-components/commit/9d2d3951570411d7302f6a6e7807eb79d1cfa021))

# [1.31.0](https://github.com/archilogic-com/ui-components/compare/v1.30.1...v1.31.0) (2023-02-09)


### Features

* **button, logo:** button size auto, icon prop change, logo-button component al-2237 ([#249](https://github.com/archilogic-com/ui-components/issues/249)) ([98b79ea](https://github.com/archilogic-com/ui-components/commit/98b79ea2a0166231be7fd16a44528717f9be9417))

## [1.30.1](https://github.com/archilogic-com/ui-components/compare/v1.30.0...v1.30.1) (2023-02-07)


### Bug Fixes

* **button:** hover, active styles for link buttons ([#248](https://github.com/archilogic-com/ui-components/issues/248)) ([0a1c89e](https://github.com/archilogic-com/ui-components/commit/0a1c89edc55532bae4628dd04a4242b64ea4ba2f))

# [1.30.0](https://github.com/archilogic-com/ui-components/compare/v1.29.4...v1.30.0) (2023-02-01)


### Features

* **text-input:** show character counter if `maxlength` is set al-3432 ([#247](https://github.com/archilogic-com/ui-components/issues/247)) ([20eca3a](https://github.com/archilogic-com/ui-components/commit/20eca3af68d39980a6c23fae89fbf51255632e30))

# [2.0.0-beta.4](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2023-01-20)


### Features

* **icons:** remove deprecated icons ([13f3f13](https://github.com/archilogic-com/ui-components/commit/13f3f13f9d455798624ed00b49b31e8c0930d44f))
* **nav-item:** remove deprecated badge prop, slot ([8ac390b](https://github.com/archilogic-com/ui-components/commit/8ac390b70c9920cbca0cf2e9b63e3f47427634c3))
* remove deprecated component aliases ([ff7c399](https://github.com/archilogic-com/ui-components/commit/ff7c3993c332741b86a82a81ad8ad4ace24416ae))
* **select:** remove deprecated select component ([fcdff62](https://github.com/archilogic-com/ui-components/commit/fcdff622661dace2d5df35eeb5f116b01f261ce8))
* **tag:** remove deprecated `variant` prop ([e9a7e91](https://github.com/archilogic-com/ui-components/commit/e9a7e91fe19b972c48f6458e6fdd06b0e2716f10))


### BREAKING CHANGES

* remove deprecated component aliases. Use the following component names instead:

- AListboxOption -> AOption
- AListboxOptionGroup -> AOptionGroup
- ABadge -> ACounter
- AChip -> AStatus
* **icons:** remove deprecated icons:
- size "other" : Area', 'Draw', 'DrawLocked', 'Length', 'Offline', 'Processing', 'Redo', 'Undo'
- size "md": 'Direction'
* **tag:** remove `a-tag` "variant" prop ("square" and "round").
The previous default `round` variant style is applied to all  `a-tag`s.
* **nav-item:** remove deprecated `badge` prop and`badge` slot from a-nav-item.
Use new `counter` prop and/or `extra` slot instead.
* **select:** remove deprecated `<a-select>` component. Use `<a-listbox>` or `<a-combobox>` instead.

# [2.0.0-beta.3](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2023-01-19)


### Features

* change package name, make public ([#244](https://github.com/archilogic-com/ui-components/issues/244)) ([58cc02b](https://github.com/archilogic-com/ui-components/commit/58cc02b62eea751af76248b07916d94878a4ec58))


### BREAKING CHANGES

* package name update, publish to public npm registry

# [2.0.0-beta.2](https://github.com/archilogic-com/ui-components/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2023-01-19)


### Bug Fixes

* **app-menu:** add scrolling, improve max-height and positioning ([#238](https://github.com/archilogic-com/ui-components/issues/238)) ([b0a6412](https://github.com/archilogic-com/ui-components/commit/b0a6412f2c0b712cbf1d5178172ed1749bad08b6))
* **app-menu:** properly disable AppMenuMultiButton ([f9cbd0f](https://github.com/archilogic-com/ui-components/commit/f9cbd0fafa6b921d33e1dfbc312a24e23cec3964))
* **label-container:** more flexible styling for row alignment ([#236](https://github.com/archilogic-com/ui-components/issues/236)) ([86bd1b6](https://github.com/archilogic-com/ui-components/commit/86bd1b6704706efaf9104945419f385e88774540))

## [1.29.4](https://github.com/archilogic-com/ui-components/compare/v1.29.3...v1.29.4) (2023-01-03)


### Bug Fixes

* **app-menu:** properly disable AppMenuMultiButton ([f9cbd0f](https://github.com/archilogic-com/ui-components/commit/f9cbd0fafa6b921d33e1dfbc312a24e23cec3964))

## [1.29.3](https://github.com/archilogic-com/ui-components/compare/v1.29.2...v1.29.3) (2022-12-22)


### Bug Fixes

* **app-menu:** add scrolling, improve max-height and positioning ([#238](https://github.com/archilogic-com/ui-components/issues/238)) ([b0a6412](https://github.com/archilogic-com/ui-components/commit/b0a6412f2c0b712cbf1d5178172ed1749bad08b6))

## [1.29.2](https://github.com/archilogic-com/ui-components/compare/v1.29.1...v1.29.2) (2022-12-16)


### Bug Fixes

* **label-container:** more flexible styling for row alignment ([#236](https://github.com/archilogic-com/ui-components/issues/236)) ([86bd1b6](https://github.com/archilogic-com/ui-components/commit/86bd1b6704706efaf9104945419f385e88774540))

# [2.0.0-beta.1](https://github.com/archilogic-com/ui-components/compare/v1.29.1...v2.0.0-beta.1) (2022-12-14)


### Features

* **address-input:** remove ([#235](https://github.com/archilogic-com/ui-components/issues/235)) ([9b1d5d9](https://github.com/archilogic-com/ui-components/commit/9b1d5d939c471b0fdd9960a2151fc37324b04912))


### BREAKING CHANGES

* **address-input:** remove a-address-input component
and related google maps types and api key.
Equivalent component has been previously added to @archilogic/app-kit private package

## [1.29.1](https://github.com/archilogic-com/ui-components/compare/v1.29.0...v1.29.1) (2022-12-06)


### Bug Fixes

* add overflow to footer slot in the NavSidebar component ([#234](https://github.com/archilogic-com/ui-components/issues/234)) ([f61d6a6](https://github.com/archilogic-com/ui-components/commit/f61d6a60c2d96b8b20c35422808531aac8de25f6))

# [1.29.0](https://github.com/archilogic-com/ui-components/compare/v1.28.0...v1.29.0) (2022-12-06)


### Features

* **app-menu:** add multi-button ([1cc4cdc](https://github.com/archilogic-com/ui-components/commit/1cc4cdc10a28c6013694b0d9093224fae74239ac))

# [1.28.0](https://github.com/archilogic-com/ui-components/compare/v1.27.0...v1.28.0) (2022-12-05)


### Features

* add additional-content slot for NavSidebar component ([#231](https://github.com/archilogic-com/ui-components/issues/231)) ([11a6836](https://github.com/archilogic-com/ui-components/commit/11a68364b936c9c7190154b5cc283777fe320a26))

# [1.27.0](https://github.com/archilogic-com/ui-components/compare/v1.26.1...v1.27.0) (2022-11-24)


### Bug Fixes

* **number-input:** steppers glitch ([#227](https://github.com/archilogic-com/ui-components/issues/227)) ([fa916ee](https://github.com/archilogic-com/ui-components/commit/fa916eed7f2176b0a2df722eb0250563de99c682))
* **text-input:** multiline subtle height ([#228](https://github.com/archilogic-com/ui-components/issues/228)) ([15f90a0](https://github.com/archilogic-com/ui-components/commit/15f90a061ea865f75ae97f4f98d58809629d6cd9))


### Features

* **colors:** add new colors ([#229](https://github.com/archilogic-com/ui-components/issues/229)) ([e82c0a7](https://github.com/archilogic-com/ui-components/commit/e82c0a7e4d405824dc37348d0ecebfd2d4b616af))

## [1.26.1](https://github.com/archilogic-com/ui-components/compare/v1.26.0...v1.26.1) (2022-11-23)


### Bug Fixes

* **radio-input:** fix model-value type ([#226](https://github.com/archilogic-com/ui-components/issues/226)) ([fdc8a51](https://github.com/archilogic-com/ui-components/commit/fdc8a51f3955f00e02751a138bd2fcaa51477180))

# [1.26.0](https://github.com/archilogic-com/ui-components/compare/v1.25.1...v1.26.0) (2022-11-17)


### Features

* new icons AL-2915 ([0ba880d](https://github.com/archilogic-com/ui-components/commit/0ba880dd3929b019fc46ba31e089fd3196f4c80e))

## [1.25.1](https://github.com/archilogic-com/ui-components/compare/v1.25.0...v1.25.1) (2022-11-16)


### Bug Fixes

* **text-input:** textarea shadow div invisible ([#222](https://github.com/archilogic-com/ui-components/issues/222)) ([49d0ee4](https://github.com/archilogic-com/ui-components/commit/49d0ee45a6da7c35cdd43b4eba3af61801b3a415))

# [1.25.0](https://github.com/archilogic-com/ui-components/compare/v1.24.1...v1.25.0) (2022-11-14)


### Features

* **radio-input:** add radio input ([#220](https://github.com/archilogic-com/ui-components/issues/220)) ([8a48ab0](https://github.com/archilogic-com/ui-components/commit/8a48ab0c7864cf08169e7c387be5cf2f5564e839))

## [1.24.1](https://github.com/archilogic-com/ui-components/compare/v1.24.0...v1.24.1) (2022-11-09)


### Bug Fixes

* **inputs:** input number v-model, subtle placeholder ([#219](https://github.com/archilogic-com/ui-components/issues/219)) ([448c776](https://github.com/archilogic-com/ui-components/commit/448c776381b3178a3319e0d09709e7725110d890))

# [1.24.0](https://github.com/archilogic-com/ui-components/compare/v1.23.0...v1.24.0) (2022-11-08)


### Features

* **number-input:** add number input with custom steppers ([#217](https://github.com/archilogic-com/ui-components/issues/217)) ([f94bd79](https://github.com/archilogic-com/ui-components/commit/f94bd79dd361d0944bd891b696527cd14a7ddcfc))

# [1.23.0](https://github.com/archilogic-com/ui-components/compare/v1.22.0...v1.23.0) (2022-11-04)


### Features

* **label-container, input-group:** AL-1910 ([#215](https://github.com/archilogic-com/ui-components/issues/215)) ([84bc771](https://github.com/archilogic-com/ui-components/commit/84bc771a047088cff1362583421fa960f7cc58ee))

# [1.22.0](https://github.com/archilogic-com/ui-components/compare/v1.21.2...v1.22.0) (2022-11-01)


### Features

* **icons:** add play and pause icons ([#216](https://github.com/archilogic-com/ui-components/issues/216)) ([f778cac](https://github.com/archilogic-com/ui-components/commit/f778cac872da04c2a4d514d33e295d299d648292))

## [1.21.2](https://github.com/archilogic-com/ui-components/compare/v1.21.1...v1.21.2) (2022-10-19)


### Bug Fixes

* reactive isCollapsed prop for nav sidebar ([#212](https://github.com/archilogic-com/ui-components/issues/212)) ([5fe2f37](https://github.com/archilogic-com/ui-components/commit/5fe2f372c8d51bd0a8c9a06936d3a1f61342dc2b))

## [1.21.1](https://github.com/archilogic-com/ui-components/compare/v1.21.0...v1.21.1) (2022-10-18)


### Bug Fixes

* **icons:** update copy and edit ([#214](https://github.com/archilogic-com/ui-components/issues/214)) ([88f46f2](https://github.com/archilogic-com/ui-components/commit/88f46f26d8fbf4d9178eb3e72c3928be63a4d790))

# [1.21.0](https://github.com/archilogic-com/ui-components/compare/v1.20.1...v1.21.0) (2022-10-17)


### Features

* **colors, color-circle, tag:** AL 2783 3/3 ([#213](https://github.com/archilogic-com/ui-components/issues/213)) ([e508339](https://github.com/archilogic-com/ui-components/commit/e508339e6c8c196ab6eb9ca64e88b23ed72b95ce))

## [1.20.1](https://github.com/archilogic-com/ui-components/compare/v1.20.0...v1.20.1) (2022-10-14)


### Bug Fixes

* **card:** add not(:hover) styles ([#211](https://github.com/archilogic-com/ui-components/issues/211)) ([27edf99](https://github.com/archilogic-com/ui-components/commit/27edf99680c69c3dd3807668514bf9fe243dedf5))

# [1.20.0](https://github.com/archilogic-com/ui-components/compare/v1.19.0...v1.20.0) (2022-10-14)


### Features

* **status:** rename Chip to Status ([#210](https://github.com/archilogic-com/ui-components/issues/210)) ([f07b73c](https://github.com/archilogic-com/ui-components/commit/f07b73cde1374f07a6a78d695d44eacf7a633a8a))

# [1.19.0](https://github.com/archilogic-com/ui-components/compare/v1.18.0...v1.19.0) (2022-10-14)


### Features

* **counter:** rename Badge to Counter AL-2783 1/3 ([#209](https://github.com/archilogic-com/ui-components/issues/209)) ([2a8fece](https://github.com/archilogic-com/ui-components/commit/2a8fece4fb5224ec9d364dfdfb4f87d6b714743f))

# [1.18.0](https://github.com/archilogic-com/ui-components/compare/v1.17.0...v1.18.0) (2022-10-13)


### Features

* **icons:** add Bin icon AL-2964 ([9b762c1](https://github.com/archilogic-com/ui-components/commit/9b762c1033f26276600d9468a159f27df7a525a1))

# [1.17.0](https://github.com/archilogic-com/ui-components/compare/v1.16.0...v1.17.0) (2022-10-11)


### Features

* card component ([#207](https://github.com/archilogic-com/ui-components/issues/207)) ([87be61d](https://github.com/archilogic-com/ui-components/commit/87be61ded8712374feb323fd966c51c68ec97d17))

# [1.16.0](https://github.com/archilogic-com/ui-components/compare/v1.15.0...v1.16.0) (2022-10-10)


### Features

* **combobox:** emit '[@update](https://github.com/update):query', add backend search example ([01c8442](https://github.com/archilogic-com/ui-components/commit/01c8442d51d39f60e386766c1a40ea847457b7e3))

# [1.15.0](https://github.com/archilogic-com/ui-components/compare/v1.14.0...v1.15.0) (2022-10-10)


### Features

* **icons:** add minimap icon ([#206](https://github.com/archilogic-com/ui-components/issues/206)) ([cdde80e](https://github.com/archilogic-com/ui-components/commit/cdde80edf81fb1f90c79a785a425778ca579b19c))

# [1.14.0](https://github.com/archilogic-com/ui-components/compare/v1.13.1...v1.14.0) (2022-10-05)


### Features

* **icons:** rename Direction to Move size 'md' ([#204](https://github.com/archilogic-com/ui-components/issues/204)) ([9b2f7f1](https://github.com/archilogic-com/ui-components/commit/9b2f7f1ddfed1643534004015742b2c7c263be3a))

## [1.13.1](https://github.com/archilogic-com/ui-components/compare/v1.13.0...v1.13.1) (2022-10-04)


### Bug Fixes

* select combobox input value on click ([#202](https://github.com/archilogic-com/ui-components/issues/202)) ([f67e527](https://github.com/archilogic-com/ui-components/commit/f67e527f6253b9f73c9c0b3c27a87c271e96e00d))

# [1.13.0](https://github.com/archilogic-com/ui-components/compare/v1.12.1...v1.13.0) (2022-09-28)


### Features

* **combobox, listbox:** render options inline ([#201](https://github.com/archilogic-com/ui-components/issues/201)) ([f7cda67](https://github.com/archilogic-com/ui-components/commit/f7cda6710398cb5bfb11aa89050936b276154ff2))

## [1.12.1](https://github.com/archilogic-com/ui-components/compare/v1.12.0...v1.12.1) (2022-09-19)


### Bug Fixes

* **button:** new disabled states ([#197](https://github.com/archilogic-com/ui-components/issues/197)) ([4b307c4](https://github.com/archilogic-com/ui-components/commit/4b307c44d6ecb886dfb8b9b4a64b200205939fc0))

# [1.12.0](https://github.com/archilogic-com/ui-components/compare/v1.11.1...v1.12.0) (2022-09-16)


### Features

* **icons:** InsertAsset icon  AL-2883 ([#198](https://github.com/archilogic-com/ui-components/issues/198)) ([da534d3](https://github.com/archilogic-com/ui-components/commit/da534d309bdc8d32fa66c340bd64e807d4da1b56))

## [1.11.1](https://github.com/archilogic-com/ui-components/compare/v1.11.0...v1.11.1) (2022-09-09)


### Bug Fixes

* docs error AL-2849 ([#194](https://github.com/archilogic-com/ui-components/issues/194)) ([2520d6e](https://github.com/archilogic-com/ui-components/commit/2520d6e8b0370b9a7faac4a464077c6e522fb14c))

# [1.11.0](https://github.com/archilogic-com/ui-components/compare/v1.10.0...v1.11.0) (2022-09-06)


### Features

* **combobox:** multiselection ([#191](https://github.com/archilogic-com/ui-components/issues/191)) ([94a2940](https://github.com/archilogic-com/ui-components/commit/94a29409a5ce270150c5945baf58bc8f6264a0e9))

# [1.10.0](https://github.com/archilogic-com/ui-components/compare/v1.9.0...v1.10.0) (2022-09-01)


### Features

* **icons:** add new icons ([#192](https://github.com/archilogic-com/ui-components/issues/192)) ([fa358a6](https://github.com/archilogic-com/ui-components/commit/fa358a6da256a83ee6752558420acf5fb1833fb7))

# [1.9.0](https://github.com/archilogic-com/ui-components/compare/v1.8.2...v1.9.0) (2022-08-24)


### Features

* **tag, color-circle:** add new components ([ae0eaf2](https://github.com/archilogic-com/ui-components/commit/ae0eaf2e4cdd3260d4bee144097d5d0dfb23a80e))

## [1.8.2](https://github.com/archilogic-com/ui-components/compare/v1.8.1...v1.8.2) (2022-08-18)


### Bug Fixes

* **combobox:** open combobox on click ([#187](https://github.com/archilogic-com/ui-components/issues/187)) ([cc31521](https://github.com/archilogic-com/ui-components/commit/cc315210e3cf784d10454a99b890d9772cd60f15))

## [1.8.1](https://github.com/archilogic-com/ui-components/compare/v1.8.0...v1.8.1) (2022-08-17)


### Bug Fixes

* **listbox:** fix option layout to avoid breaking change ([#186](https://github.com/archilogic-com/ui-components/issues/186)) ([e812ffd](https://github.com/archilogic-com/ui-components/commit/e812ffdebe0fb7a8496629d304a7ded69314ad41))

# [1.8.0](https://github.com/archilogic-com/ui-components/compare/v1.7.0...v1.8.0) (2022-08-16)


### Features

* vertical alignment options for dialogs ([1e0c031](https://github.com/archilogic-com/ui-components/commit/1e0c031fbdf16bea9efd49bb897eb0b4c2302cd3))

# [1.7.0](https://github.com/archilogic-com/ui-components/compare/v1.6.1...v1.7.0) (2022-08-12)


### Features

* **combobox:** single-select combobox, a-option Al 2358 AL-2521 ([#183](https://github.com/archilogic-com/ui-components/issues/183)) ([f93487e](https://github.com/archilogic-com/ui-components/commit/f93487efb7cfdc90ed4471d0339ba4862b509172))

## [1.6.1](https://github.com/archilogic-com/ui-components-next/compare/v1.6.0...v1.6.1) (2022-08-03)


### Bug Fixes

* chip size ([#181](https://github.com/archilogic-com/ui-components-next/issues/181)) ([5cd4ae4](https://github.com/archilogic-com/ui-components-next/commit/5cd4ae49e1e2f6faf01464a909a6838519d8f80c))

# [1.6.0](https://github.com/archilogic-com/ui-components-next/compare/v1.5.2...v1.6.0) (2022-08-01)


### Features

* new variant for chip ([#180](https://github.com/archilogic-com/ui-components-next/issues/180)) ([e043987](https://github.com/archilogic-com/ui-components-next/commit/e043987c3dd28c07e99d2c47281b854508768577))

## [1.5.2](https://github.com/archilogic-com/ui-components-next/compare/v1.5.1...v1.5.2) (2022-07-29)


### Bug Fixes

* min-width for the sidebar ([#179](https://github.com/archilogic-com/ui-components-next/issues/179)) ([9a5cbd9](https://github.com/archilogic-com/ui-components-next/commit/9a5cbd9a2d64048ae7047056c301f2d0f84d4b1f))

## [1.5.1](https://github.com/archilogic-com/ui-components-next/compare/v1.5.0...v1.5.1) (2022-07-28)


### Bug Fixes

* **app-menu:** small width on narrow screen ([#178](https://github.com/archilogic-com/ui-components-next/issues/178)) ([327dbdf](https://github.com/archilogic-com/ui-components-next/commit/327dbdffbe2c434fe50d476afa5a9fa736238b3e))

# [1.5.0](https://github.com/archilogic-com/ui-components-next/compare/v1.4.0...v1.5.0) (2022-07-28)


### Bug Fixes

* **sidebar:** remove overflow class ([#177](https://github.com/archilogic-com/ui-components-next/issues/177)) ([401f03f](https://github.com/archilogic-com/ui-components-next/commit/401f03fab0af4073bbde5243aac534257fd57222))


### Features

* add new primary variant for Bagde component ([#176](https://github.com/archilogic-com/ui-components-next/issues/176)) ([2a48a94](https://github.com/archilogic-com/ui-components-next/commit/2a48a940745622cbb59314cb621f9ae6aef0cee5))

# [1.4.0](https://github.com/archilogic-com/ui-components-next/compare/v1.3.6...v1.4.0) (2022-07-25)


### Features

* create and export typescript definitions ([#175](https://github.com/archilogic-com/ui-components-next/issues/175)) ([9627894](https://github.com/archilogic-com/ui-components-next/commit/9627894a5c45c20ff503dc0ed7f59d1768fc0006))

## [1.3.6](https://github.com/archilogic-com/ui-components-next/compare/v1.3.5...v1.3.6) (2022-07-15)


### Bug Fixes

* **sidebar:** resizing handle for scrollable sidebar ([#173](https://github.com/archilogic-com/ui-components-next/issues/173)) ([a93ffa5](https://github.com/archilogic-com/ui-components-next/commit/a93ffa50fa356d7044ee21014c7101bd321b5645))

## [1.3.5](https://github.com/archilogic-com/ui-components-next/compare/v1.3.4...v1.3.5) (2022-07-15)


### Bug Fixes

* **app-menu:** reposition submenu Al 2470 ([#171](https://github.com/archilogic-com/ui-components-next/issues/171)) ([a712136](https://github.com/archilogic-com/ui-components-next/commit/a712136db1b0bb76c6843f66fb8f422277589787))

## [1.3.4](https://github.com/archilogic-com/ui-components-next/compare/v1.3.3...v1.3.4) (2022-07-14)


### Bug Fixes

* **checkbox:** align checkbox to top and fix inherit attrs ([#172](https://github.com/archilogic-com/ui-components-next/issues/172)) ([2aa6c0a](https://github.com/archilogic-com/ui-components-next/commit/2aa6c0ab836eb7adbeb6de80b3942ef1192ab9a5))

## [1.3.3](https://github.com/archilogic-com/ui-components-next/compare/v1.3.2...v1.3.3) (2022-07-13)


### Bug Fixes

* **tab:** add bottom border ([#170](https://github.com/archilogic-com/ui-components-next/issues/170)) ([b636dd2](https://github.com/archilogic-com/ui-components-next/commit/b636dd2ed64c51cf038eb429ad03385070dfe7de))

## [1.3.2](https://github.com/archilogic-com/ui-components-next/compare/v1.3.1...v1.3.2) (2022-07-12)


### Bug Fixes

* **text-input:** multiline wrap without spaces ([#169](https://github.com/archilogic-com/ui-components-next/issues/169)) ([293ab41](https://github.com/archilogic-com/ui-components-next/commit/293ab41ee64039644e8d4e4603d751f6c9325828))

## [1.3.1](https://github.com/archilogic-com/ui-components-next/compare/v1.3.0...v1.3.1) (2022-07-05)


### Bug Fixes

* **select:** make multiple select grow vertically ([#168](https://github.com/archilogic-com/ui-components-next/issues/168)) ([75f07df](https://github.com/archilogic-com/ui-components-next/commit/75f07dff33ac87ea44c397224e73b073431dd562))

# [1.3.0](https://github.com/archilogic-com/ui-components-next/compare/v1.2.6...v1.3.0) (2022-07-04)


### Features

* **listbox:** add a-listbox-option-group and refactor listbox-option ([#167](https://github.com/archilogic-com/ui-components-next/issues/167)) ([d18b30f](https://github.com/archilogic-com/ui-components-next/commit/d18b30faaff120bf0e1409e04cf500e2c7724eaf))

## [1.2.6](https://github.com/archilogic-com/ui-components-next/compare/v1.2.5...v1.2.6) (2022-06-30)


### Bug Fixes

* social icons ([#166](https://github.com/archilogic-com/ui-components-next/issues/166)) ([4539855](https://github.com/archilogic-com/ui-components-next/commit/4539855ff27a9af908684a3d1f41c51d2283b1aa))

## [1.2.5](https://github.com/archilogic-com/ui-components-next/compare/v1.2.4...v1.2.5) (2022-06-28)


### Bug Fixes

* **table-header:** add aria-sort and sortable prop ([#165](https://github.com/archilogic-com/ui-components-next/issues/165)) ([c4324f7](https://github.com/archilogic-com/ui-components-next/commit/c4324f78508ab7b3e4fcf44f810543f5d36e9a16))

## [1.2.4](https://github.com/archilogic-com/ui-components-next/compare/v1.2.3...v1.2.4) (2022-06-28)


### Bug Fixes

* **disclosure:** truncate summary text ([167df0f](https://github.com/archilogic-com/ui-components-next/commit/167df0f70ad6bb728fa00a74926b7bd999d8ad37))

## [1.2.3](https://github.com/archilogic-com/ui-components-next/compare/v1.2.2...v1.2.3) (2022-06-28)


### Bug Fixes

* **helper-text:** align warning icon ([#162](https://github.com/archilogic-com/ui-components-next/issues/162)) ([a7d3f61](https://github.com/archilogic-com/ui-components-next/commit/a7d3f61907c6fe057b5729afde4b802564b4f357))
* **link:** remove link padding ([#163](https://github.com/archilogic-com/ui-components-next/issues/163)) ([1545926](https://github.com/archilogic-com/ui-components-next/commit/1545926569e4446f5d3920442b78ae0e62f4e6c7))

## [1.2.2](https://github.com/archilogic-com/ui-components-next/compare/v1.2.1...v1.2.2) (2022-06-27)


### Bug Fixes

* clean up declared dependencies  and bump headlessui/vue ([#160](https://github.com/archilogic-com/ui-components-next/issues/160)) ([33fc827](https://github.com/archilogic-com/ui-components-next/commit/33fc82704884fbb1dd7bfeeac5e7dc06c707afb2))

## [1.2.1](https://github.com/archilogic-com/ui-components-next/compare/v1.2.0...v1.2.1) (2022-06-27)


### Bug Fixes

* use ellipsis character instead of triple dots ([213ec88](https://github.com/archilogic-com/ui-components-next/commit/213ec88c3b43e90db288bcfe6085385e0d20f280))

# [1.2.0](https://github.com/archilogic-com/ui-components-next/compare/v1.1.0...v1.2.0) (2022-06-27)


### Features

* **listbox:** add a-listbox ([#153](https://github.com/archilogic-com/ui-components-next/issues/153)) ([17ebb06](https://github.com/archilogic-com/ui-components-next/commit/17ebb0697fdef23885f08a2d9caefa860fc0dc28))

# [1.1.0](https://github.com/archilogic-com/ui-components-next/compare/v1.0.1...v1.1.0) (2022-06-24)


### Features

* **table-row:** expose tr ref ([#158](https://github.com/archilogic-com/ui-components-next/issues/158)) ([8654fe9](https://github.com/archilogic-com/ui-components-next/commit/8654fe962c96c20caa04752628fac51e79347681))

## [1.0.1](https://github.com/archilogic-com/ui-components-next/compare/v1.0.0...v1.0.1) (2022-06-10)


### Bug Fixes

* **icons:** eager load all icons Al 2169 ([#149](https://github.com/archilogic-com/ui-components-next/issues/149)) ([ec1b23c](https://github.com/archilogic-com/ui-components-next/commit/ec1b23c1cd668e81c45c342465a5d170b9f35218))

# [1.0.0](https://github.com/archilogic-com/ui-components-next/compare/v0.5.16...v1.0.0) (2022-06-09)


### Bug Fixes

* **app-menu:** reposition submenu if does not fit ([#145](https://github.com/archilogic-com/ui-components-next/issues/145)) ([71d95eb](https://github.com/archilogic-com/ui-components-next/commit/71d95eb3793ab0df17dc2a5122895a18d7469dfd))


### Features

* configure semantic-release and rename package([#147](https://github.com/archilogic-com/ui-components-next/issues/147)) ([95778df](https://github.com/archilogic-com/ui-components-next/commit/95778df52b34892cab14a26b5e496d760092bcdb))


### BREAKING CHANGES

* name change to `@archilogic/ui-components. Update your dependencies list and package imports, as well as tailwind preset path.

### [0.5.16](https://github.com/archilogic-com/ui-components-next/compare/v0.5.15...v0.5.16) (2022-06-03)


### Bug Fixes

* **dialog:** be able to align a dialog action to the left AL-2107 ([b6e8ddc](https://github.com/archilogic-com/ui-components-next/commit/b6e8ddce4f9c21a8f2d8bbbc20dcd53de574c3b6))

### [0.5.15](https://github.com/archilogic-com/ui-components-next/compare/v0.5.14...v0.5.15) (2022-06-01)


### Features

* **select:** the dropdown always has the width of the input (a.k.a. trigger button)  AL-2254 ([48091ad](https://github.com/archilogic-com/ui-components-next/commit/48091ad54c65922a20d53ff16557380ea593897d))
* shared style for keyboard input element kbd AL-2236 ([e3fb899](https://github.com/archilogic-com/ui-components-next/commit/e3fb899918f4dfff93f53f2ad000914b91aa1674))


### Bug Fixes

* **arrow-key:** assign tabZeroElement on mount ([1d1d583](https://github.com/archilogic-com/ui-components-next/commit/1d1d583511512446e7d13f2a9aa40df46536ba05))
* **table:** add scroll-margin-top ([56ca1fa](https://github.com/archilogic-com/ui-components-next/commit/56ca1fa179ff830feb440b2d1a3dbdb55f7a7dbb))

### [0.5.14](https://github.com/archilogic-com/ui-components-next/compare/v0.5.13...v0.5.14) (2022-05-25)


### Bug Fixes

* **table:** table-row selection events ([#138](https://github.com/archilogic-com/ui-components-next/issues/138)) ([20a97f1](https://github.com/archilogic-com/ui-components-next/commit/20a97f1e80fe9709f2a1b5662247fbe777216a5c))

### [0.5.13](https://github.com/archilogic-com/ui-components-next/compare/v0.5.12...v0.5.13) (2022-05-25)


### Bug Fixes

* multiple menus ([#137](https://github.com/archilogic-com/ui-components-next/issues/137)) ([320f24c](https://github.com/archilogic-com/ui-components-next/commit/320f24c448b200f741dd6f7dc68a39e09ec809b3))

### [0.5.12](https://github.com/archilogic-com/ui-components-next/compare/v0.5.11...v0.5.12) (2022-05-24)


### Bug Fixes

* **multiSelect, table, checkbox:** play nicely together ([#135](https://github.com/archilogic-com/ui-components-next/issues/135)) ([be3d3b2](https://github.com/archilogic-com/ui-components-next/commit/be3d3b2944d7a9fa7c919d01ec27ce5e8f87e780))

### [0.5.11](https://github.com/archilogic-com/ui-components-next/compare/v0.5.10...v0.5.11) (2022-05-23)


### Features

* **icons:** inspector ([#134](https://github.com/archilogic-com/ui-components-next/issues/134)) ([31c1c1b](https://github.com/archilogic-com/ui-components-next/commit/31c1c1b784a6b37a86df99101e4b716d58e130c5))

### [0.5.10](https://github.com/archilogic-com/ui-components-next/compare/v0.5.9...v0.5.10) (2022-05-23)


### Bug Fixes

* **app-menu:** close submenu on arrow left even for disabled item ([#130](https://github.com/archilogic-com/ui-components-next/issues/130)) ([39c26c8](https://github.com/archilogic-com/ui-components-next/commit/39c26c8b77cac96568c414f2b4ae4dcbf7a09665))
* **table:** scrolling example ([#132](https://github.com/archilogic-com/ui-components-next/issues/132)) ([a7c8560](https://github.com/archilogic-com/ui-components-next/commit/a7c856025a8b684c777cd7bf69d660e65a13282c))
* **useMultiSelect:** allow not clear on click ([#133](https://github.com/archilogic-com/ui-components-next/issues/133)) ([3ad3f32](https://github.com/archilogic-com/ui-components-next/commit/3ad3f3299b7059f65e0663a3231de57829eb9dc8))

### [0.5.9](https://github.com/archilogic-com/ui-components-next/compare/v0.5.8...v0.5.9) (2022-05-12)


### Features

* **arrow-key-focus:** skip element w/o tabindex ([#129](https://github.com/archilogic-com/ui-components-next/issues/129)) ([b5ec5a3](https://github.com/archilogic-com/ui-components-next/commit/b5ec5a30e431cc0f08feccd3f13664b51966d7a9))


### Bug Fixes

* **app-menu:** tiny fixes ([#128](https://github.com/archilogic-com/ui-components-next/issues/128)) ([c89c2dc](https://github.com/archilogic-com/ui-components-next/commit/c89c2dce4696912351824d0132869587e9445f65))

### [0.5.8](https://github.com/archilogic-com/ui-components-next/compare/v0.5.7...v0.5.8) (2022-05-11)


### Features

* **app-menu:** optional menu button ([#122](https://github.com/archilogic-com/ui-components-next/issues/122)) ([c70d798](https://github.com/archilogic-com/ui-components-next/commit/c70d798aa83b1085bcbd4af814d9048d4f954250))
* **separator:** create separator component ([#127](https://github.com/archilogic-com/ui-components-next/issues/127)) ([35d35b1](https://github.com/archilogic-com/ui-components-next/commit/35d35b1cf7e27507eb2faa77e0e79f45dc85bb55))

### [0.5.7](https://github.com/archilogic-com/ui-components-next/compare/v0.5.6...v0.5.7) (2022-05-10)


### Features

* **app-menu:** separator ([93d7f21](https://github.com/archilogic-com/ui-components-next/commit/93d7f21f9de0e101aec9d74499a0120b0d540657))


### Bug Fixes

* **app-menu:** fix submenu bugs and hover behavior ([#125](https://github.com/archilogic-com/ui-components-next/issues/125)) ([4c45bcb](https://github.com/archilogic-com/ui-components-next/commit/4c45bcb6c26ef14f7a407a66d531cd302818ff79))
* **dialog:** be able to use an a-select inside an a-dialog AL-2011 ([1c34ed8](https://github.com/archilogic-com/ui-components-next/commit/1c34ed84aee42cffde908f1995ca0c58b6d7adc7))

### [0.5.6](https://github.com/archilogic-com/ui-components-next/compare/v0.5.5...v0.5.6) (2022-05-05)


### Bug Fixes

* menu z-index ([#123](https://github.com/archilogic-com/ui-components-next/issues/123)) ([d102d65](https://github.com/archilogic-com/ui-components-next/commit/d102d65cb8aef976e3a3519f21080d298f45dc08))

### [0.5.5](https://github.com/archilogic-com/ui-components-next/compare/v0.5.4...v0.5.5) (2022-05-02)


### Bug Fixes

* **app-menu:** update doc + don't trigger callback twice ([be67252](https://github.com/archilogic-com/ui-components-next/commit/be67252cca497f3644be6575f89bdd840676a1d3))

### [0.5.4](https://github.com/archilogic-com/ui-components-next/compare/v0.5.3...v0.5.4) (2022-04-29)


### Features

* **menu:** Al 2132 menuitem checkbox, disabled state ([#121](https://github.com/archilogic-com/ui-components-next/issues/121)) ([53f22ba](https://github.com/archilogic-com/ui-components-next/commit/53f22bac2919d5b11f7fa0400bf0a135e1bcd1ec))

### [0.5.3](https://github.com/archilogic-com/ui-components-next/compare/v0.5.2...v0.5.3) (2022-04-29)


### Features

* **app-menu:** new menu component for application menus al 1025 ([#120](https://github.com/archilogic-com/ui-components-next/issues/120)) ([28c1943](https://github.com/archilogic-com/ui-components-next/commit/28c1943ff1cea842b8696ed4c47860b4333b7f33))

### [0.5.2](https://github.com/archilogic-com/ui-components-next/compare/v0.5.1...v0.5.2) (2022-04-25)


### Bug Fixes

* the toggle slot for the nav sidebar ([#115](https://github.com/archilogic-com/ui-components-next/issues/115)) ([a065c1a](https://github.com/archilogic-com/ui-components-next/commit/a065c1aff20c796502bd9199283f74f95c256c2f))

### [0.5.1](https://github.com/archilogic-com/ui-components-next/compare/v0.5.0...v0.5.1) (2022-04-22)


### Features

* **icons:** drawing icons AL-2013 ([3633bc4](https://github.com/archilogic-com/ui-components-next/commit/3633bc4c742ddf584edd69e15cb654c337efc79f))

## [0.5.0](https://github.com/archilogic-com/ui-components-next/compare/v0.4.1...v0.5.0) (2022-04-20)


### ⚠ BREAKING CHANGES

* - to get the fonts loaded, the consumer now should import '@archilogic-com/ui-components-next/tailwind/index.css'. This will also include the main tailwind import, so your app does not need to import `tailwindcss` separately.

- base (global) styles are now included as opt-in plugin.

* fix(tailwind): move  font imports to index.css

* feat(typography): add jetBrains font and 'code' utility class

* feat(tailwind): make  base styles optional

* feat(tailwind): add base body styles
* **select:** `a-select` default size is now `sm` to be consistent with `a-text-input`. 
Please add prop `size="md"` to your inputs if previously relied on the default value being `md`.

### Features

* **dialog:** Dialog without actions footer section AL-2015 ([edd3691](https://github.com/archilogic-com/ui-components-next/commit/edd3691efaf9b28c9c43eecb533f4a9131889e6d))
* fonts and global styles ([#111](https://github.com/archilogic-com/ui-components-next/issues/111)) ([869bb4b](https://github.com/archilogic-com/ui-components-next/commit/869bb4b80f214bcf50882975222e2ed38bf38370))
* **icons:** Al 1827 icons updates ([#110](https://github.com/archilogic-com/ui-components-next/issues/110)) ([ce9247a](https://github.com/archilogic-com/ui-components-next/commit/ce9247a17bcd68945e79858fac3d8d5fae8a1e3a))


### Bug Fixes

* **select:** make default size sm ([#112](https://github.com/archilogic-com/ui-components-next/issues/112)) ([51552b6](https://github.com/archilogic-com/ui-components-next/commit/51552b6953f60fd7031dbbfcc2066e9971352b3a))

### [0.4.1](https://github.com/archilogic-com/ui-components-next/compare/v0.4.0...v0.4.1) (2022-04-14)


### Features

* **icons:** new Processing and Offline icons AL-2089 ([5824588](https://github.com/archilogic-com/ui-components-next/commit/5824588fcf8a95b7dd9c42c33838cd7bd8f18fb7))

## [0.4.0](https://github.com/archilogic-com/ui-components-next/compare/v0.3.22...v0.4.0) (2022-04-12)


### ⚠ BREAKING CHANGES

* the input is now default size 'sm'. If you didn't specify the size for the 'md' inputs they will become 'sm'.

### Features

* **menu:** allow to keep the menu trigger button pressed while menu is open AL-2075 ([af8c6bb](https://github.com/archilogic-com/ui-components-next/commit/af8c6bb0904b84d73281ebfb8558b59fce7b2fdc))


*  feat(text-input): make sm default size Al 2050 (#104) ([f234b10](https://github.com/archilogic-com/ui-components-next/commit/f234b105d4a126e722f18220e3d41248c89c0dd2)), closes [#104](https://github.com/archilogic-com/ui-components-next/issues/104)

### [0.3.22](https://github.com/archilogic-com/ui-components-next/compare/v0.3.21...v0.3.22) (2022-04-08)


### Bug Fixes

* add background for a-menu ([#102](https://github.com/archilogic-com/ui-components-next/issues/102)) ([fa31626](https://github.com/archilogic-com/ui-components-next/commit/fa31626cea69acebe1ed2a4242260dbe90774ca4))
* back for the disabled button ([#103](https://github.com/archilogic-com/ui-components-next/issues/103)) ([6ef4584](https://github.com/archilogic-com/ui-components-next/commit/6ef4584635fb587ad051dfea012f1cdde60e9e62))

### [0.3.21](https://github.com/archilogic-com/ui-components-next/compare/v0.3.20...v0.3.21) (2022-04-07)


### Features

* **tailwind:** add component classes, refactor global styles and fix disabled button hover ([#101](https://github.com/archilogic-com/ui-components-next/issues/101)) ([cade04b](https://github.com/archilogic-com/ui-components-next/commit/cade04bd5e8589690c73f3edf6f1372307a2a1fb))


### Bug Fixes

* checkbox input size ([#99](https://github.com/archilogic-com/ui-components-next/issues/99)) ([014661f](https://github.com/archilogic-com/ui-components-next/commit/014661f586e1f7b3eb8537d164db6b3c3337f0d9))

### [0.3.20](https://github.com/archilogic-com/ui-components-next/compare/v0.3.19...v0.3.20) (2022-03-31)


### Features

* **button:** new pressed state AL-2042 ([8434427](https://github.com/archilogic-com/ui-components-next/commit/8434427226c65d95bcc46b094917f92306c0a291))


### Bug Fixes

* **button:** disabled/loading button color ([4a1e011](https://github.com/archilogic-com/ui-components-next/commit/4a1e011ecb527f2b221f76fdfb23f301f4af9144))

### [0.3.19](https://github.com/archilogic-com/ui-components-next/compare/v0.3.18...v0.3.19) (2022-03-31)


### Features

* **icon:** new OpenPadlock icon AL-2051 ([55ca53c](https://github.com/archilogic-com/ui-components-next/commit/55ca53c4cb477808bdfdd4b6a4e4d27eed1ef97e))

### [0.3.18](https://github.com/archilogic-com/ui-components-next/compare/v0.3.17...v0.3.18) (2022-03-30)


### Features

* **typography:** add body aliases for 400 weight ([#96](https://github.com/archilogic-com/ui-components-next/issues/96)) ([44494e3](https://github.com/archilogic-com/ui-components-next/commit/44494e3ca1782c7461b5a62202305ff412be163e))


### Bug Fixes

* **text-input:** allow undefined value ([#95](https://github.com/archilogic-com/ui-components-next/issues/95)) ([e6ee454](https://github.com/archilogic-com/ui-components-next/commit/e6ee4548400cd526a17c282d20ee0e5274e676a6))

### [0.3.17](https://github.com/archilogic-com/ui-components-next/compare/v0.3.16...v0.3.17) (2022-03-29)


### Features

* **table:** enable opt-out for truncate class ([#91](https://github.com/archilogic-com/ui-components-next/issues/91)) ([274c5fe](https://github.com/archilogic-com/ui-components-next/commit/274c5fe0470a5147670d7c0b1cbb69231fdb82b3))

### [0.3.16](https://github.com/archilogic-com/ui-components-next/compare/v0.3.15...v0.3.16) (2022-03-29)


### Features

* **icons:** new icons for Editor's header toolbar AL-2009 ([35fdd6b](https://github.com/archilogic-com/ui-components-next/commit/35fdd6b19232ac8162efd71ffa96b4e0220c5082))


### Bug Fixes

* **button:** don't let buttons get squeezed by flexbox layouts ([1529eac](https://github.com/archilogic-com/ui-components-next/commit/1529eacaa5ce5192a35b82e7a039d2488247080f))
* table header z-index ([#89](https://github.com/archilogic-com/ui-components-next/issues/89)) ([d3a6643](https://github.com/archilogic-com/ui-components-next/commit/d3a664348134b66e37f614aced78b44a3dee20e9))

### [0.3.15](https://github.com/archilogic-com/ui-components-next/compare/v0.3.14...v0.3.15) (2022-03-25)


### Features

* **text-input:** add multiline type (textarea) ([#87](https://github.com/archilogic-com/ui-components-next/issues/87)) ([a656253](https://github.com/archilogic-com/ui-components-next/commit/a656253b44e16e5682a35bedb301f17b1a89f8fe))


### Bug Fixes

* no margins on outermost component DOM element ([300a621](https://github.com/archilogic-com/ui-components-next/commit/300a621da697b65f70ee92728281aada0845453b))

### [0.3.14](https://github.com/archilogic-com/ui-components-next/compare/v0.3.13...v0.3.14) (2022-03-24)


### Features

* **icons:** add new icons ([#85](https://github.com/archilogic-com/ui-components-next/issues/85)) ([fc772b4](https://github.com/archilogic-com/ui-components-next/commit/fc772b4eed9b7960c70abaae629d77f91308e2db))

### [0.3.13](https://github.com/archilogic-com/ui-components-next/compare/v0.3.12...v0.3.13) (2022-03-18)


### Features

* address input ([#81](https://github.com/archilogic-com/ui-components-next/issues/81)) ([40dd289](https://github.com/archilogic-com/ui-components-next/commit/40dd2896656c2a16ab2e719736b91dbb373aeda1))
* **helper-text:** add helper text component ([#83](https://github.com/archilogic-com/ui-components-next/issues/83)) ([373f659](https://github.com/archilogic-com/ui-components-next/commit/373f659699197645e5fa8f574617b3439a95dfd1))


### Bug Fixes

* avatar ([#84](https://github.com/archilogic-com/ui-components-next/issues/84)) ([93de963](https://github.com/archilogic-com/ui-components-next/commit/93de96382e07eb1a0fa6bf24a7abe07cadf5ca49))
* **input:** text color of disabled input in Safari browser ([698f512](https://github.com/archilogic-com/ui-components-next/commit/698f51209678c6bbf6e6de104cfac1185da8e588))

### [0.3.12](https://github.com/archilogic-com/ui-components-next/compare/v0.3.11...v0.3.12) (2022-03-10)


### Bug Fixes

* **avatar:** export component ([74f58d9](https://github.com/archilogic-com/ui-components-next/commit/74f58d9b0fdefcfbb1f03a6cc37dde53673dd07d))

### [0.3.11](https://github.com/archilogic-com/ui-components-next/compare/v0.3.10...v0.3.11) (2022-03-10)


### Features

* avatar ([#76](https://github.com/archilogic-com/ui-components-next/issues/76)) ([3352864](https://github.com/archilogic-com/ui-components-next/commit/3352864d31e65fee66dec376d04b7b12a1a6028a))
* new chip component ([#79](https://github.com/archilogic-com/ui-components-next/issues/79)) ([714b5f4](https://github.com/archilogic-com/ui-components-next/commit/714b5f4bd02f1601f7ae1d702d1598072f2f625f))
* provide size and variant for Select ([#77](https://github.com/archilogic-com/ui-components-next/issues/77)) ([3277c7d](https://github.com/archilogic-com/ui-components-next/commit/3277c7dc21bffef78a2b3055fc33f88faea6471d))
* sorting composable AL-1959 ([bbccc2b](https://github.com/archilogic-com/ui-components-next/commit/bbccc2bce22bcb32e677e573c7c34d36dd74bcce))

### [0.3.10](https://github.com/archilogic-com/ui-components-next/compare/v0.3.9...v0.3.10) (2022-03-08)


### Features

* **typography:** 2 additional heading sizes ([d84d63c](https://github.com/archilogic-com/ui-components-next/commit/d84d63cdfc7d8688b584dc1b2da9ce00099e63b5))

### [0.3.9](https://github.com/archilogic-com/ui-components-next/compare/v0.3.8...v0.3.9) (2022-03-08)


### Bug Fixes

* **menu:** vertically and horizontally center the menu trigger button ([a25a2a9](https://github.com/archilogic-com/ui-components-next/commit/a25a2a921df07c7209dfbd3aac9952ebddfa7656))

### [0.3.8](https://github.com/archilogic-com/ui-components-next/compare/v0.3.7...v0.3.8) (2022-03-07)


### Features

* **select:** new Select and SelectOption components AL-1761 ([60df074](https://github.com/archilogic-com/ui-components-next/commit/60df0745a40ccd29603905cc7c8927bce00a781a))

### [0.3.7](https://github.com/archilogic-com/ui-components-next/compare/v0.3.6...v0.3.7) (2022-03-02)


### Bug Fixes

* **button:** replace transparent colors ([#71](https://github.com/archilogic-com/ui-components-next/issues/71)) ([107a769](https://github.com/archilogic-com/ui-components-next/commit/107a7697a6913dbeeb9495e91af27ebd1763b293))
* **docs:** title for Menu component ([5aedfed](https://github.com/archilogic-com/ui-components-next/commit/5aedfedf9ae4b4667d1fca96c567357dd9cfe18a))
* **tab:** do not use Tab component ([#69](https://github.com/archilogic-com/ui-components-next/issues/69)) ([e73b515](https://github.com/archilogic-com/ui-components-next/commit/e73b515f83f9430fc80d80781ddf32f021ebb6d6))

### [0.3.6](https://github.com/archilogic-com/ui-components-next/compare/v0.3.5...v0.3.6) (2022-02-25)


### Features

* **menu:** new Menu component ([7c4d4fa](https://github.com/archilogic-com/ui-components-next/commit/7c4d4fa2c4e62ff3ee4ef4613ef1186d84dab0cb))

### [0.3.5](https://github.com/archilogic-com/ui-components-next/compare/v0.3.4...v0.3.5) (2022-02-22)


### Features

* focus-border styles and checkbox docs improvements ([#65](https://github.com/archilogic-com/ui-components-next/issues/65)) ([5904de1](https://github.com/archilogic-com/ui-components-next/commit/5904de11c42aa55e2ac9ab6dd2472e45ecca2077))
* **tabs, hr:** tab button component and hr styles ([#68](https://github.com/archilogic-com/ui-components-next/issues/68)) ([cd00cd5](https://github.com/archilogic-com/ui-components-next/commit/cd00cd5155a8cc2db37a78aa2c5281c85a6e37c6))
* **text input:** Al 1554 ([#66](https://github.com/archilogic-com/ui-components-next/issues/66)) ([a571520](https://github.com/archilogic-com/ui-components-next/commit/a57152040be509d4beac31003d33990a3d03b155))

### [0.3.4](https://github.com/archilogic-com/ui-components-next/compare/v0.3.3...v0.3.4) (2022-02-11)


### Features

* **disclosure:** new Disclosure component ([78858e2](https://github.com/archilogic-com/ui-components-next/commit/78858e23a2a1c36baf8049c167c758422bc18a91))


### Bug Fixes

* emit the close event after the transition duration is over ([2277767](https://github.com/archilogic-com/ui-components-next/commit/2277767b6cc0c74b729610be5d6955cc104b7cc6))
* remove headless exports ([#64](https://github.com/archilogic-com/ui-components-next/issues/64)) ([c48de16](https://github.com/archilogic-com/ui-components-next/commit/c48de16596118e86c27c179111b1a2949068ea2e))

### [0.3.3](https://github.com/archilogic-com/ui-components-next/compare/v0.3.2...v0.3.3) (2022-02-10)


### Features

* **nav-sidebar:** add collapsible prop ([#59](https://github.com/archilogic-com/ui-components-next/issues/59)) ([0144b1c](https://github.com/archilogic-com/ui-components-next/commit/0144b1ccedfadec4ee5304605456ecdea281029c))


### Bug Fixes

* **checkbox:** focus styles ([#62](https://github.com/archilogic-com/ui-components-next/issues/62)) ([70372f1](https://github.com/archilogic-com/ui-components-next/commit/70372f10a2b960977b0d2e05e06fa69f569bd87c))

### [0.3.2](https://github.com/archilogic-com/ui-components-next/compare/v0.3.1...v0.3.2) (2022-02-09)

### [0.3.1](https://github.com/archilogic-com/ui-components-next/compare/v0.3.0...v0.3.1) (2022-02-07)


### Bug Fixes

* **link:** remove padding and refactor outline and underline styles ([#57](https://github.com/archilogic-com/ui-components-next/issues/57)) ([f6ef9a4](https://github.com/archilogic-com/ui-components-next/commit/f6ef9a4b448e4c6f66ce187e94260ef68601d0de))
* small mistake in buttons docs ([4877e1d](https://github.com/archilogic-com/ui-components-next/commit/4877e1d5f96e8247d851888443e9dd1cf2efa4d6))

## [0.3.0](https://github.com/archilogic-com/ui-components-next/compare/v0.2.9...v0.3.0) (2022-02-01)


### ⚠ BREAKING CHANGES

* slot `actions` renamed to `action` (singular)

* docs improvement

### Bug Fixes

* toast classes priority ([#55](https://github.com/archilogic-com/ui-components-next/issues/55)) ([f9b04e2](https://github.com/archilogic-com/ui-components-next/commit/f9b04e2a1ce4307da6aca9f21fd551d1014ecdd8))


* Toast improvements (#54) ([5f7182b](https://github.com/archilogic-com/ui-components-next/commit/5f7182b5b9051a28c9f3e6e0577272ffc0a1d993)), closes [#54](https://github.com/archilogic-com/ui-components-next/issues/54)

### [0.2.9](https://github.com/archilogic-com/ui-components-next/compare/v0.2.8...v0.2.9) (2022-01-28)


### Features

* toasts ([#46](https://github.com/archilogic-com/ui-components-next/issues/46)) ([fdf07dc](https://github.com/archilogic-com/ui-components-next/commit/fdf07dcc09c0d59eeb7916eefb9a9e14c37956cb))
* **toggle:** add a toggle component Al 1707 ([#52](https://github.com/archilogic-com/ui-components-next/issues/52)) ([86d4cac](https://github.com/archilogic-com/ui-components-next/commit/86d4cac0fb2e60c2ded7859c88004163d9fe0b3e))

### [0.2.8](https://github.com/archilogic-com/ui-components-next/compare/v0.2.7...v0.2.8) (2022-01-27)


### Bug Fixes

* dialog title ([#51](https://github.com/archilogic-com/ui-components-next/issues/51)) ([f6a44db](https://github.com/archilogic-com/ui-components-next/commit/f6a44dbdda03deca59c0390b27ee0462b250fe98))

### [0.2.7](https://github.com/archilogic-com/ui-components-next/compare/v0.2.6...v0.2.7) (2022-01-25)


### Bug Fixes

* adjust colors ([#50](https://github.com/archilogic-com/ui-components-next/issues/50)) ([85885b0](https://github.com/archilogic-com/ui-components-next/commit/85885b008369520337b9a6b17f286bdd500be587))

### [0.2.6](https://github.com/archilogic-com/ui-components-next/compare/v0.2.4...v0.2.6) (2022-01-24)


### Features

* **link:** Al 1206 link component ([#47](https://github.com/archilogic-com/ui-components-next/issues/47)) ([bb0922f](https://github.com/archilogic-com/ui-components-next/commit/bb0922f29e9e9093c997188a4af02f4b7aa4175f))


### Bug Fixes

* **dialog:** close prop ([#49](https://github.com/archilogic-com/ui-components-next/issues/49)) ([e40afc0](https://github.com/archilogic-com/ui-components-next/commit/e40afc0ba6b28266d3d06d234679af21e51b390c))
* **navItem:** add active state and scoped slot for badge ([#48](https://github.com/archilogic-com/ui-components-next/issues/48)) ([3f5eeb7](https://github.com/archilogic-com/ui-components-next/commit/3f5eeb7d73b84a5bbcc826d8a48252315a2d52a1))

### [0.2.5](https://github.com/archilogic-com/ui-components-next/compare/v0.2.4...v0.2.5) (2022-01-24)


### Features

* **link:** Al 1206 link component ([#47](https://github.com/archilogic-com/ui-components-next/issues/47)) ([bb0922f](https://github.com/archilogic-com/ui-components-next/commit/bb0922f29e9e9093c997188a4af02f4b7aa4175f))


### Bug Fixes

* add test for esc ([cb50ffc](https://github.com/archilogic-com/ui-components-next/commit/cb50ffcebdbef19593778b4b205cb75c836aeff8))
* dialog close prop ([8fe3b65](https://github.com/archilogic-com/ui-components-next/commit/8fe3b653650aca20361330e6a0fab07724273732))
* improve dialog and tests ([9fcfc4d](https://github.com/archilogic-com/ui-components-next/commit/9fcfc4d10028f4a361e3b9dceee635fb20e2de18))
* **navItem:** add active state and scoped slot for badge ([#48](https://github.com/archilogic-com/ui-components-next/issues/48)) ([3f5eeb7](https://github.com/archilogic-com/ui-components-next/commit/3f5eeb7d73b84a5bbcc826d8a48252315a2d52a1))
* remove moduleMapper ([dc9e342](https://github.com/archilogic-com/ui-components-next/commit/dc9e342a0a19c1545b4b652e6e12c897292ec1bb))
* tests ([fc0a924](https://github.com/archilogic-com/ui-components-next/commit/fc0a924374192a8121662ca0fab0805ef1ad4d7a))
* tests ([c580056](https://github.com/archilogic-com/ui-components-next/commit/c58005621a03d219c65451f50fc438bdde89d48f))
* tests for the Dialog component ([6bebebf](https://github.com/archilogic-com/ui-components-next/commit/6bebebf1d9f5f8089a2bf2300c1a63abf8a52804))

### [0.2.4](https://github.com/archilogic-com/ui-components-next/compare/v0.2.3...v0.2.4) (2022-01-19)


### Features

* badge prop/slot for NavItem AL-1745 ([02938db](https://github.com/archilogic-com/ui-components-next/commit/02938db76e35b885223750d52fb618b2312b639a))
* bump dependencies AL-1638 ([99c41cc](https://github.com/archilogic-com/ui-components-next/commit/99c41ccb422e9b80ebbbd0ee425dc26d1a6cc279))
* **dialog:** new dialog styles ([#44](https://github.com/archilogic-com/ui-components-next/issues/44)) al-1637 ([cd1b026](https://github.com/archilogic-com/ui-components-next/commit/cd1b026daecee1b0235920cf6c92292105f00f6f))
* new Badge component AL-1745 ([da17694](https://github.com/archilogic-com/ui-components-next/commit/da17694a308ce8e424fc7b73291696204c221e69))

### [0.2.3](https://github.com/archilogic-com/ui-components-next/compare/v0.2.2...v0.2.3) (2022-01-14)


### Bug Fixes

* **table:** allow toggling table row programmatically ([#42](https://github.com/archilogic-com/ui-components-next/issues/42)) ([82a139b](https://github.com/archilogic-com/ui-components-next/commit/82a139b03187a90fa6eeb971643f668c4f770b96))

### [0.2.2](https://github.com/archilogic-com/ui-components-next/compare/v0.2.1...v0.2.2) (2021-12-21)


### Features

* **arrow-key-focusable:** allow left/right key navigation ([#39](https://github.com/archilogic-com/ui-components-next/issues/39)) ([dba1931](https://github.com/archilogic-com/ui-components-next/commit/dba1931ba7b85e490964c91ee6b1d702c1763dfe))
* **dialog:** add dialog component AL-1551 ([#38](https://github.com/archilogic-com/ui-components-next/issues/38)) ([6c007a2](https://github.com/archilogic-com/ui-components-next/commit/6c007a2cb81a3880bb21aedfec67051b623ef6c9))
* **multiSelect:** add afterSelect callback AL-1546 ([#40](https://github.com/archilogic-com/ui-components-next/issues/40)) ([6bcecf3](https://github.com/archilogic-com/ui-components-next/commit/6bcecf3e4eec594077261a7c0beeefbdd630a606))


### Bug Fixes

* **table:** update selected row bg color on hover AL-1550 ([#37](https://github.com/archilogic-com/ui-components-next/issues/37)) ([e841b8a](https://github.com/archilogic-com/ui-components-next/commit/e841b8a11a8ef11b860f099151863d9048c88389))

### [0.2.1](https://github.com/archilogic-com/ui-components-next/compare/v0.2.0...v0.2.1) (2021-12-17)


### Features

* **nav:**  a-nav-item component and a-nav-sidebar fixes Al 1611 ([#36](https://github.com/archilogic-com/ui-components-next/issues/36)) ([54298c9](https://github.com/archilogic-com/ui-components-next/commit/54298c930195c476e6200f3bd4c62e11728d3cb7))
* **nav-sidebar:** create nav sidebar and story ([#35](https://github.com/archilogic-com/ui-components-next/issues/35)) ([62cdd35](https://github.com/archilogic-com/ui-components-next/commit/62cdd3502abe81a040976f852b0af26dca4e00b8))
* **sidebar:** add resizable prop AL 1436 ([#34](https://github.com/archilogic-com/ui-components-next/issues/34)) ([0e3ce0d](https://github.com/archilogic-com/ui-components-next/commit/0e3ce0d0942ff685c884f505a42ccc5774185e98))

## [0.2.0](https://github.com/archilogic-com/ui-components-next/compare/v0.1.4...v0.2.0) (2021-12-01)


### ⚠ BREAKING CHANGES

* each composable is exported as a named export

* docs(storybook): move intro docs to storybook

* docs(storybook): sort story sections

* docs(button): add router-link docs

* docs(button): fix link to vue-router docs

* docs(guide): update global registration example

* fix(bundle): named exports for each composable

* update storybook docs  Al 1416  ([#32](https://github.com/archilogic-com/ui-components-next/issues/32)) ([b8fcd10](https://github.com/archilogic-com/ui-components-next/commit/b8fcd10786fce55d32fe6a4c6d02c1e797c61561))

### [0.1.4](https://github.com/archilogic-com/ui-components-next/compare/v0.1.3...v0.1.4) (2021-11-29)


### Features

* **tailwind:** add `focus-shadow` and `focus-outline` classes Al 1395 ([#31](https://github.com/archilogic-com/ui-components-next/issues/31)) ([cf6f2f7](https://github.com/archilogic-com/ui-components-next/commit/cf6f2f7709ca447ecd31eaf2db64524ab61e2b4f))


### Bug Fixes

* **table:** prevent text selection on shift ([#29](https://github.com/archilogic-com/ui-components-next/issues/29)) ([4945b26](https://github.com/archilogic-com/ui-components-next/commit/4945b26cacfae2514df4765b047a11f04668e0e5))

### [0.1.3](https://github.com/archilogic-com/ui-components-next/compare/v0.1.2...v0.1.3) (2021-11-24)


### Features

* **arrowKeyFocusable, table:** add arrowKey navigation ([#28](https://github.com/archilogic-com/ui-components-next/issues/28)) ([d784937](https://github.com/archilogic-com/ui-components-next/commit/d78493735736c8dddca328c92a660255a13baff8))

### [0.1.2](https://github.com/archilogic-com/ui-components-next/compare/v0.1.1...v0.1.2) (2021-11-24)


### Features

* **Dialog,Menu,Popover,Listbox:** export headless ([0570539](https://github.com/archilogic-com/ui-components-next/commit/057053923e1fb7372a51f1c53bd9e40882b32f3f))

### [0.1.1](https://github.com/archilogic-com/ui-components-next/compare/v0.1.0...v0.1.1) (2021-11-19)


### Features

* **icons:** add new icons and refactor docs ([#27](https://github.com/archilogic-com/ui-components-next/issues/27)) ([864bc8f](https://github.com/archilogic-com/ui-components-next/commit/864bc8f661a7b7876c0ec6e612f011c834473378))
* **multiSelect:** add multi select Al 1341  ([#26](https://github.com/archilogic-com/ui-components-next/issues/26)) ([55afe51](https://github.com/archilogic-com/ui-components-next/commit/55afe51562ff28e0685628fd587a4b6cb04a804f))

## [0.1.0](https://github.com/archilogic-com/ui-components-next/compare/v0.0.7...v0.1.0) (2021-11-18)


### ⚠ BREAKING CHANGES

* **table:** `a-table-cell` no longer has a `header` prop. Use `a-table-header` instead.

fix: styling fixes
feat: nested rows and sorting indicators
docs: stories
test: expandable table-row and table-cell

### Features

* **table:** nested rows, docs, other improvements ([#22](https://github.com/archilogic-com/ui-components-next/issues/22)) ([8c2f3fa](https://github.com/archilogic-com/ui-components-next/commit/8c2f3fa14adae1c935b1f8003ceb48d5d864afa0))

### [0.0.7](https://github.com/archilogic-com/ui-components-next/compare/v0.0.6...v0.0.7) (2021-11-10)

### Features

- **skeleton:** skeletons (Al 1381) and tailwind jit mode ([#23](https://github.com/archilogic-com/ui-components-next/issues/23)) ([27af6a9](https://github.com/archilogic-com/ui-components-next/commit/27af6a97207b934381152cd943c5c7c466996835))
- **spinner:** add spinner component (Al 1380) ([#21](https://github.com/archilogic-com/ui-components-next/issues/21)) ([abc0040](https://github.com/archilogic-com/ui-components-next/commit/abc00400ee095b48ba81e59757840b5dfdf9b469))

### Bug Fixes

- **skeleton:** animation ([#24](https://github.com/archilogic-com/ui-components-next/issues/24)) ([02c3f3a](https://github.com/archilogic-com/ui-components-next/commit/02c3f3a5b9db5669803572c71fb56ca6b70bc8ec))
- **table:** spell out dynamic classes ([#25](https://github.com/archilogic-com/ui-components-next/issues/25)) ([676c0f1](https://github.com/archilogic-com/ui-components-next/commit/676c0f1116a2024c635ba6186d3defc951a80b92))

### [0.0.6](https://github.com/archilogic-com/ui-components-next/compare/v0.0.5...v0.0.6) (2021-11-02)

### Features

- **table:** add a table component ([#20](https://github.com/archilogic-com/ui-components-next/issues/20)) ([40dafaf](https://github.com/archilogic-com/ui-components-next/commit/40dafafe73ddab450258434c4b8fd75b060585ca))

### Bug Fixes

- **topbar:** secondary topbar buttons ([#19](https://github.com/archilogic-com/ui-components-next/issues/19)) ([efd3b43](https://github.com/archilogic-com/ui-components-next/commit/efd3b43733e2e3f38a4388fe258806e2888db1d1))

### [0.0.5](https://github.com/archilogic-com/ui-components-next/compare/v0.0.4...v0.0.5) (2021-10-27)

### Features

- **logo:** update logo ([#18](https://github.com/archilogic-com/ui-components-next/issues/18)) ([29f3900](https://github.com/archilogic-com/ui-components-next/commit/29f39001ee7d6f8c4cee01bdacb759472f870e34))

### Bug Fixes

- **icons:** reactive dynamic component name ([#17](https://github.com/archilogic-com/ui-components-next/issues/17)) ([e985b6a](https://github.com/archilogic-com/ui-components-next/commit/e985b6a79c9f3e9640476eecbe9ad6110360099a))

### [0.0.4](https://github.com/archilogic-com/ui-components-next/compare/v0.0.3...v0.0.4) (2021-10-25)

### Features

- **topbar:** top bars (Al 1033) ([#16](https://github.com/archilogic-com/ui-components-next/issues/16)) ([010951d](https://github.com/archilogic-com/ui-components-next/commit/010951dd2119820d9e40631f4197df85c3dbe99e))

### Bug Fixes

- **vite:** fix file extention for es module build ([2bef724](https://github.com/archilogic-com/ui-components-next/commit/2bef724482d45ef9136984aabb8fa7645822cc9c))

### [0.0.3](https://github.com/archilogic-com/ui-components-next/compare/v0.0.2...v0.0.3) (2021-10-22)

### Features

- **icons:** icons ([#14](https://github.com/archilogic-com/ui-components-next/issues/14)) Al 1036 ([c700afe](https://github.com/archilogic-com/ui-components-next/commit/c700afe7709883f8d6abe1fcadd16234f3332c99))
- **logo:** add logo component and docs ([#11](https://github.com/archilogic-com/ui-components-next/issues/11)) AL-1185 ([4b31535](https://github.com/archilogic-com/ui-components-next/commit/4b31535096d59f64613048e04ac47832f78e1d4a))
- **tabs:** export headless-ui tabs components ([#9](https://github.com/archilogic-com/ui-components-next/issues/9)) ([2d4d70b](https://github.com/archilogic-com/ui-components-next/commit/2d4d70b1a939c3e346635985124351a64ccf8ecb))
- **typography:** include inter font and add docs ([#8](https://github.com/archilogic-com/ui-components-next/issues/8)) Al 1248 ([d6b39c2](https://github.com/archilogic-com/ui-components-next/commit/d6b39c2f1ac7d187dc338ae1a4dd1e6a31958a93))

### Bug Fixes

- **ci:** enforce node version ([#13](https://github.com/archilogic-com/ui-components-next/issues/13)) ([c9cad30](https://github.com/archilogic-com/ui-components-next/commit/c9cad308d3427d0271464a1510263d4228f71d1d))

### [0.0.2](https://github.com/archilogic-com/ui-components-next/compare/v0.0.1...v0.0.2) (2021-10-08)

### Features

- **button:** buttons various states ([#7](https://github.com/archilogic-com/ui-components-next/issues/7)) Al 1024 ([19d97db](https://github.com/archilogic-com/ui-components-next/commit/19d97db1d4421b815e4389040db60c9ac981f944))

### 0.0.1 (2021-10-05)

## 0.0.0 (2021-10-04)
