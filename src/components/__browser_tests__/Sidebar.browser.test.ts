import { render } from '@testing-library/vue'
import { userEvent } from 'vitest/browser'

import Sidebar from '../Sidebar.vue'

// The sidebar takes its starting width from its content rather than a style
// attribute: the resize handler writes straight to el.style.width, and a
// fallthrough `style` attr is re-applied on the next render (isResizing flips a
// class), which would silently undo the drag.
const SidebarHost = {
  components: { Sidebar },
  template: `
    <div class="flex" style="height: 300px">
      <Sidebar resizable>
        <div style="width: 200px; height: 300px">sidebar content</div>
      </Sidebar>
      <div
        data-testid="drop-target"
        style="position: fixed; top: 0; left: 400px; width: 2px; height: 300px"></div>
    </div>
  `
}

describe('Sidebar', () => {
  // The resize handler is pure layout maths over getBoundingClientRect(), which
  // jsdom reports as all-zeroes — so it can only be asserted in a real browser,
  // and only a real mouse drag produces the clientX it reads.
  it('resizes to the drop position on a real mouse drag of the handle', async () => {
    const { getByRole, getByTestId } = render(SidebarHost)
    const sidebar = getByRole('complementary')
    const target = getByTestId('drop-target')
    const widthBefore = sidebar.getBoundingClientRect().width

    await userEvent.dragAndDrop(getByRole('separator'), target)

    const targetRect = target.getBoundingClientRect()
    const dropX = targetRect.left + targetRect.width / 2
    const expectedWidth = dropX - sidebar.getBoundingClientRect().left
    const widthAfter = sidebar.getBoundingClientRect().width

    expect(widthAfter).toBeGreaterThan(widthBefore)
    // a couple of pixels of slack: the drop point is reported in whole pixels
    expect(Math.abs(widthAfter - expectedWidth)).toBeLessThanOrEqual(2)
    // the drag released, so the global resize cursor is cleaned up again
    expect(document.body.style.cursor).toBe('auto')
  })
})
