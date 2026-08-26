/*
 * Setup for the `browser` test project.
 *
 * Deliberately NOT vitest.setup.ts: that file stubs IntersectionObserver and
 * patches tabbable to `displayCheck: 'none'` to paper over jsdom. Here the
 * browser provides both for real, which is what these tests are for.
 *
 * Element matchers (toHaveFocus, toBeInTheDocument, ...) are built into Vitest
 * browser mode, so @testing-library/jest-dom is not needed either.
 */
import './vitest.browser.css'

// @testing-library/vue reads process.env.VTL_SKIP_AUTO_CLEANUP at import time,
// and there is no `process` in a browser. Nothing else here needs it.
const globalWithProcess = globalThis as typeof globalThis & {
  process?: { env: Record<string, string | undefined> }
}
globalWithProcess.process ??= { env: {} }
