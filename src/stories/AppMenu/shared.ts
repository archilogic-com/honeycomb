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

export const menuStoriesParameters = { layout: 'fullscreen', chromatic: { delay: 1000 } }
