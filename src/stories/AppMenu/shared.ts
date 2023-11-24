import { within } from '@storybook/testing-library'

export const menuStoriesDecorators = [
  () => ({
    template: `
      <div class="w-full p-4">
        <div style="width: 300px; height: 300px; display: flex; justify-content: flex-start;">
          <story/>
        </div>
      </div>`
  })
]

export const menuStoriesParameters = { layout: 'fullscreen' }

export const openMenu = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('button').click()
}

export const openMenuAndSubmenu = async (
  { canvasElement }: { canvasElement: HTMLElement },
  submenuLevels: number = 1
) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('button').click()
  for (let submenu = 0; submenu < submenuLevels; submenu++) {
    await canvas.getAllByRole('menuitem', { expanded: false })[0].click()
  }
}
