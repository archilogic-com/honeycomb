import * as Components from './components'
import type { App } from 'vue'

export function registerAllComponents(app: App): void {
  Object.keys(Components).forEach(componentName => {
    app.component(componentName, Components[componentName as keyof typeof Components])
  })
}

export * from './components'

export * from './composables'

export * from './colors'

export * from './types'
